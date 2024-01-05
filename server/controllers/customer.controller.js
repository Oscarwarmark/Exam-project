const fs = require("fs");
const bcrypt = require("bcrypt");
const { initStripe } = require("../stripe");
const stripe = initStripe();
const CustomerDB = "./db/customerDB.json";
const { UserModel } = require("../models/customer.model");
const { log } = require("console");

const createCustomer = async (req, res) => {
  const customerData = req.body;
  const customer = await stripe.customers.create({
    description: "Customer created from register form",
    name: customerData.name,
    email: customerData.email,
  });

  if (customer) {
    const newCustomer = {
      id: customer.id,
      name: customerData.name,
      email: customer.email,
      password: "",
    };

    // Check if the user exists

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json("Email already registred");
    }

    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const jsonUser = user.toJSON();
    jsonUser._id = user._id;
    delete jsonUser.password;

    res.status(201).send(jsonUser);
  }
};

const logInCustomer = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    }).select("+password");

    if (
      !existingUser ||
      !(await bcrypt.compare(req.body.password, existingUser.password))
    ) {
      return res.status(401).json("Wrong password or username");
    }

    const user = {
      _id: existingUser._id,
      // Other user properties you want to include in the session
      // Avoid sensitive data here
    };

    // Set session data
    console.log(user);
    req.session.user = user;

    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const logOutCustomer = async (req, res) => {
  req.session = null;
  res.status(201).json(req.session);
  console.log("signed out", req.session);
};

module.exports = { createCustomer, logInCustomer, logOutCustomer };

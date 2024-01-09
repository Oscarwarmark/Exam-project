const bcrypt = require("bcrypt");
const { initStripe } = require("../stripe");
const stripe = initStripe();
const { UserModel } = require("../models/customer.model");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

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
  // Check if username and password is correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    return res.status(401).json("Wrong password or username");
  }

  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  // Check if user already is logged in
  if (req.session._id) {
    return res.status(200).json(user);
  }

  // Save info about the user to the session (an encrypted cookie stored on the client)
  req.session = user;
  res.status(200).json(user);
};

const logOutCustomer = async (req, res) => {
  req.session = null;
  res.status(201).json(req.session);
  console.log("signed out", req.session);
};

async function signInWithGoogle(req, res) {
  res.header("accsess-control-allow-origin", "http://loclalhost:5173");
  res.header("Referrer-policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
}

async function authorize(req, res) {
  if (!req.session._id) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session);
}

module.exports = {
  createCustomer,
  logInCustomer,
  logOutCustomer,
  authorize,
  signInWithGoogle,
};

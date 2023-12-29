require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const checkoutRoutes = require("./routes/checkout.route");
const productsRoutes = require("./routes/products.route");
const customerRoutes = require("./routes/customer.route");

const CLIENT_URL = "http://localhost:5173";
const app = express();

app.use(
  cookieSession({
    name: "session",
    secret: "s3cr3t",
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false,
  })
);
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());

app.use("/api/create-checkout-session", checkoutRoutes);
app.use("/api/getProducts", productsRoutes);
app.use("/api/customer", customerRoutes);

app.listen(3000, () => console.log("server is up and running"));

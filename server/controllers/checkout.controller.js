const { initStripe } = require("../stripe");
const stripe = initStripe();
const { OrderModel } = require("../models/order.model");
const { Types } = require("mongoose");

const CLIENT_URL = "http://localhost:5173";

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      customer: req.session.id,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("det gick inte bra");
  }
};

const verifyStripeSession = async (req, res) => {
  try {
    // Retrieve a checkout session
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    // Exit code block if the session order has not been paid for
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    // Retrieve line items associated with the session
    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    // Retrieve product information for each line item
    const productPromises = lineItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);

      return {
        totalPrice: item.amount_total / 100,
        discount: item.amount_discount,
        product: product.id,
        unitPrice: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images[0],
      };
    });

    // Use Promise.all to wait for all promises to resolve
    const products = await Promise.all(productPromises);
    console.log("line_items", lineItems);

    console.log("products", products);
    console.log("session", session);
    // Create a new order instance using the OrderModel
    const order = new OrderModel({
      customer: session.customer,
      orderNumber: session.payment_intent.substring(3),
      name: session.customer_details.name,
      totalOrderPrice: session.amount_total / 100,
      orderItems: products,
    });

    // Save the order to MongoDB
    await order.save();

    // Send a successful verification response
    res.status(200).json({ verified: true });
  } catch (error) {
    console.error("Error in verifyStripeSession:", error.message);
    // Send error response to the client
    res.status(500).json({ verified: false, error: "Internal Server Error" });
  }
};

module.exports = { createCheckoutSession, verifyStripeSession };

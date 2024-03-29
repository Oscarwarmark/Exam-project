const { initStripe } = require("../stripe");
const stripe = initStripe();
const { OrderModel } = require("../models/order.model");

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
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "sek",
            },
            display_name: "Gratis leverans",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 29900,
              currency: "sek",
            },
            display_name: "Express leverans",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
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

// verifyes and saves order to database
const verifyStripeSession = async (req, res) => {
  try {
    //Retrieving a checkout session
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    // Retrieving product information for each line item
    const productPromises = lineItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      return {
        totalPrice: item.amount_total / 100,
        discount: item.amount_discount,
        product: product.id,
        productName: product.name,
        unitPrice: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images[0],
      };
    });

    const products = await Promise.all(productPromises);

    // shipping details from the session
    const shippingDetails = {
      name: session.shipping_details.name,
      address: {
        line1: session.shipping_details.address.line1,
        line2: session.shipping_details.address.line2,
        city: session.shipping_details.address.city,
        postalCode: session.shipping_details.address.postal_code,
        country: session.shipping_details.address.country,
      },
    };

    const order = new OrderModel({
      customer: req.session._id,
      orderNumber: session.payment_intent.substring(3),
      name: session.customer_details.name,
      totalOrderPrice: session.amount_total / 100,
      orderItems: products,
      shippingDetails: shippingDetails,
    });

    console.log("order", order);
    await order.save();

    res.status(200).json({ verified: true, orderId: order._id });
  } catch (error) {
    console.error("Error in verifyStripeSession:", error.message);
    if (error.details) {
      console.error("Validation error details:", error.details);
    }
    res.status(500).json({ verified: false, error: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getOrderDetails,
  createCheckoutSession,
  verifyStripeSession,
};

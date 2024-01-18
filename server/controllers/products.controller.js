const { initStripe } = require("../stripe");
const stripe = initStripe();

const CLIENT_URL = "http://localhost:5173";

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    // Retrieve the product from Stripe using its ID
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });
    res.status(200).json(product);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error retrieving product from Stripe:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 10,
      expand: ["data.default_price"],
    });

    res.status(200).json(products.data);
  } catch (error) {
    console.error("Error retrieving products:", error);
  }
};

module.exports = { getProducts, getProductById };

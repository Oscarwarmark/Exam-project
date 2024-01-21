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

const newProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
    });

    const priceObj = await stripe.prices.create({
      unit_amount: price * 100, // Stripe prices are in cents
      currency: "usd", // Change to your preferred currency
      product: product.id,
    });

    res.json({ productId: product.id, priceId: priceObj.id });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getProducts, getProductById, newProduct };

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
    // Handle errors
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

// Create a product on Stripe
const newProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
      images: [imageUrl],
      default_price_data: {
        currency: "sek",
        tax_behavior: "inclusive",
        unit_amount: price * 100,
      },
    });

    // Fetch the product to check if it has been created successfully
    const fetchedProduct = await stripe.products.retrieve(product.id);

    res.json({ productId: fetchedProduct.id });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { getProducts, getProductById, newProduct };

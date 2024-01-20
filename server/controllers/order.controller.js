const { OrderModel } = require("../models/order.model");

const ITEMS_PER_PAGE = 10; // Adjust as needed

const getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const query = req.session.isAdmin ? {} : { customer: req.session._id };

  try {
    const totalOrders = await OrderModel.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

    const orders = await OrderModel.find(query)
      .populate("customer")
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({
      orders,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrders,
};

const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// PLACE ORDER
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!Array.isArray(order)) {
      return res.status(400).json({ message: "Order should be an array" });
    }

    for (const i of order) {
      const newOrder = new Order({ user: id, cloth: i._id });
      const orderData = await newOrder.save();

      // SAVING ORDER
      await User.findByIdAndUpdate(id, { $push: { orders: orderData._id } });

      // CLEARING CART AFTER SAVING IN ORDER
      await User.findByIdAndUpdate(id, { $pull: { cart: i._id } });
    }

    return res.status(200).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

// GET PREVIOUS ORDER INFO OF A USER
router.get("/order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "cloth" }
    });

    const ordersData = userData.orders.reverse();
    return res.status(200).json({ data: ordersData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

// GET ALL ORDERS FOR ADMIN
router.get("/all-orders", authenticateToken, async (req, res) => {
  try {
    const ordersData = await Order.find()
      .populate({
        path: "cloth"
      })
      .populate({
        path: "user"
      })
      .sort({
        createdAt: -1
      });

    return res.status(200).json({ data: ordersData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error", error });
  }
});

// ADMIN UPDATING ORDER
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, {
      status: req.body.status
    });

    return res.status(200).json({ message: "Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

module.exports = router;

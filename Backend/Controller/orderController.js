import Order from "../Modal/Order.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { name, phone, orderType, tableNumber, items, subtotal, tax, total } =
      req.body;

    const newOrder = new Order({
      name,
      phone,
      orderType,
      tableNumber,
      items,
      subtotal,
      tax,
      total,
    });

    await newOrder.save();

    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

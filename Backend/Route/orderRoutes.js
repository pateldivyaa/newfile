import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder, // ✅ import new controller
} from "../Controller/orderController.js";

const router = express.Router();

// POST /api/orders
router.post("/", createOrder);

// GET /api/orders
router.get("/", getOrders);

// ✅ DELETE /api/orders/:id
router.delete("/:id", deleteOrder);

export default router;

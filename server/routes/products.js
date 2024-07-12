import express from "express";
import {
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getProducts);
router.get("/:id", getProductById);

/* DELETE */
router.delete("/:id", deleteProductById);

export default router;

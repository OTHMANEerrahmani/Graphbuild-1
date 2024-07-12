import express from "express";
import { createSession, paymentSuccess } from "../controllers/stripe.js";
import Stripe from "stripe";

const router = express.Router();

/* STRIPE */

// Route to initiate the Stripe session
router.post("/create-stripe-session", createSession);

// Route for handling payment success
router.post("/payment-success", paymentSuccess);

export default router;

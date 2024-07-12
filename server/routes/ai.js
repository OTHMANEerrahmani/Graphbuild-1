import express from "express";
import { destroy, gallery } from "../controllers/ai.js";

const router = express.Router();

router.get("/gallery", gallery);

router.post("/destroy",destroy)

export default router;

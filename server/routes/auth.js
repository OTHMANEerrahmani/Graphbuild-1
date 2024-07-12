import express from "express";
import { forget, login, reset } from "../controllers/auth.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forget);
router.post("/reset-password/:id/:token", reset);

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
 
  res.redirect(
    `http://localhost:5173/redirect?token=${token}&user=${JSON.stringify(
      req.user
    )}`
  );
});

export default router;

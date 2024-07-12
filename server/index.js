import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

import { PythonShell } from "python-shell";

import path from "path";
import { fileURLToPath } from "url";
import { createProduct, updateProduct } from "./controllers/products.js";

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import ChatRoute from "./routes/chat.js";
import MessageRoute from "./routes/message.js";
import UserRoute from "./routes/user.js";
import StripeRoute from "./routes/stripe.js";

import { register } from "./controllers/auth.js";
import passport from "passport";
import passportSetup from "./passport.js";
import session from "express-session";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Google Auth */
// Configure session middleware
app.use(
  session({
    secret: "lama", // Change this to a more secure secret
    resave: false,
    saveUninitialized: true,
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES WITH FILES */
app.post("/products", upload.single("picture"), createProduct);
app.put("/products/:id", upload.single("picture"), updateProduct);
app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cloudinary", aiRoutes);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/user", UserRoute);
app.use("/stripe", StripeRoute);

app.post("/search", (req, res) => {
  const query = req.body.query;
  console.log("Received query:", query);

  // Construct options for PythonShell
  const options = {
    mode: "text",
    pythonOptions: ["-u"],
    // pythonPath: "./scripts/.venv/bin/python",
    scriptPath: "./scripts/",
    args: [query],
  };

  // Execute Python script with PythonShell
  PythonShell.run("search_products.py", options)
    .then((results) => {
      try {
        const parsedResults = JSON.parse(results[0]);
        res.json(parsedResults);
        console.log("Search completed.");
      } catch (error) {
        console.error("Error parsing Python script output:", error);
        res.status(500).send("An error occurred while parsing results.");
      }
    })
    .catch((err) => {
      console.error("Error executing Python script:", err);
      res.status(500).send("An error occurred while executing the script.");
    });
});

app.post("/WebScraping", (req, res) => {
  const query = req.body.query;
  console.log("Received query:", query);

  // Construct options for PythonShell
  const options = {
    mode: "text",
    pythonOptions: ["-u"],
    // pythonPath: "./scripts/.venv/bin/python",
    scriptPath: "./scripts/",
    args: [query],
  };

  // Execute Python script with PythonShell
  PythonShell.run("amazon_webscraping.py", options)
    .then((results) => {
      try {
        const parsedResults = JSON.parse(results[0]);
        res.json(parsedResults);
        console.log("Search completed.");
      } catch (error) {
        console.error("Error parsing Python script output:", error);
        res.status(500).send("An error occurred while parsing results.");
      }
    })
    .catch((err) => {
      console.error("Error executing Python script:", err);
      res.status(500).send("An error occurred while executing the script.");
    });
});

app.post("/predict", (req, res) => {
  const { accessToken, adAccountId } = req.body;

  // Construct options for PythonShell
  const options = {
    mode: "text",
    pythonOptions: ["-u"],
    // pythonPath: "./scripts/.venv/bin/python",
    scriptPath: "./scripts/",
    args: [accessToken, adAccountId],
  };

  // Execute Python script with PythonShell
  PythonShell.run("facebook_ads_performance_prediction.py", options)
    .then((results) => {
      try {
        const parsedResults = JSON.parse(results);
        res.json(parsedResults);
        console.log("Prediction completed.");
      } catch (error) {
        res.status(500).send("An error occurred while parsing results.");
      }
    })
    .catch((err) => {
      res.status(500).send("An error occurred while executing the script.");
    });
});

/* MONGOOSE SETUP */
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/* GALLERY */

export const gallery = async (req, res) => {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=1000`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${apiKey}:${apiSecret}`
          ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch images: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data.resources);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};

/* Destroy */

export const destroy = async (req, res) => {
  const { public_id } = req.body;

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    // Create a string with the parameters used in the POST request
    const paramString = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

    // Create a hexadecimal message digest (hash value) of the string using SHA-1 algorithm
    const signature = crypto
      .createHash("sha1")
      .update(paramString)
      .digest("hex");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          public_id: public_id,
          timestamp: timestamp,
          signature: signature,
          api_key: process.env.CLOUDINARY_API_KEY,
        }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error.message || "Failed to delete image");
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error.message);
    res.status(500).json({ error: error.message });
  }
};

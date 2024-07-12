import Product from "../models/Product.js";

/* CREATE */
export const createProduct = async (req, res) => {
  try {
    const {
      userId,
      name,
      prdPrix,
      prixVente,
      callCenter,
      country,
      picturePath,
      senarioData,
    } = req.body;

    const parsedSenarioData = JSON.parse(senarioData);
    const newProduct = new Product({
      userId,
      name,
      prdPrix,
      prixVente,
      picturePath,
      callCenter,
      country,
      senarioData: parsedSenarioData,
    });
    await newProduct.save();

    const product = await Product.find({ userId });
    res.status(201).json(product);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getProducts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      name,
      prdPrix,
      prixVente,
      callCenter,
      country,
      picturePath,
      senarioData,
    } = req.body;

    let parsedSenarioData;
    if (senarioData) {
      parsedSenarioData = JSON.parse(senarioData);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        prdPrix,
        prixVente,
        picturePath,
        callCenter,
        country,
        senarioData: parsedSenarioData,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  try {
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

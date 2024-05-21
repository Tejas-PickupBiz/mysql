import express from "express";
import { Product } from "../entity/Product.js";
import AppDataSource from "../data-source.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find({ relations: ["user"] });
  res.json(products);
});

router.post("/", async (req, res) => {
  const productRepository = AppDataSource.getRepository(Product);
  const userRepository = AppDataSource.getRepository("User");

  // Create a new product and associate it with a user
  const { name, price, description, userId } = req.body;
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newProduct = productRepository.create({
    name,
    price,
    description,
    user,
  });
  const result = await productRepository.save(newProduct);
  res.json(result);
});

export default router;

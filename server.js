import express from "express";
import AppDataSource from "./src/data-source.js";
import User from "./src/entity/User.js";
import productRoutes from "./src/routes/Product.routes.js";
const app = express();
const port = 4000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.get("/", async (req, res) => {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.json(users);
    });

    app.post("/users", async (req, res) => {
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create(req.body);
      const result = await userRepository.save(newUser);
      res.json(result);
    });

    app.use("/products", productRoutes);
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

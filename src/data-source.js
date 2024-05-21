import { DataSource } from "typeorm";
import User from "./entity/User.js";
import { Product } from "./entity/Product.js";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "admin",
  password: "Admin@1234",
  database: "demo1",
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;

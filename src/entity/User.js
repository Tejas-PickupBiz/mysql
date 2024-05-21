import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    age: {
      type: "int",
    },
  },
  relations: {
    products: {
      type: "one-to-many",
      target: "Product",
      inverseSide: "user",
      cascade: true,
    },
  },
});
export default User;

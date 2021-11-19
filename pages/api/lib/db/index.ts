import { UserType } from "../../../../common/types/user";
import DummyDatabase from "./dummy";
import JsonDatabase from "./json";

export interface DB {
  readUser(email: string): UserType;
  updateUser(email: string, user: UserType): UserType;
}

let db: DB;
if (process.env.NODE_ENV == 'development') {
  db = new JsonDatabase();
} else if (process.env.NODE_ENV == 'production') {
  db = new DummyDatabase(); // TODO: replace with MongoDB
}

export default db;
import { UserType } from "../../../../common/types/user";
import JsonDatabase from "./json";
import MongoDB from "./mongo";

export interface DB {
  readUser(email: string): Promise<UserType>;
  updateUser(email: string, user: UserType): Promise<UserType>;
}

let db: DB;
if (process.env.NODE_ENV == 'development' && !process.env.USE_MONGODB) {
  db = new JsonDatabase();
} else {
  db = new MongoDB(); // TODO: replace with MongoDB
}

export default db;
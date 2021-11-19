import { UserType } from "../../../../common/types/user";
import JsonDatabase from "./json";

export interface DB {
  readUser(email: string): UserType;
  updateUser(email: string, user: UserType): UserType;
}

const db = new JsonDatabase();
export default db;
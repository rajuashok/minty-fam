import { UserType } from "../../../../common/types/user";

export interface DB {
  readUser(email: string);
  updateUser(email: string, user: UserType);
}
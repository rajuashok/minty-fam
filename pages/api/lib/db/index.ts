import { UserType } from "../../../../common/types/user";

export interface DB {
  readUser(email: string): UserType;
  updateUser(email: string, user: UserType): UserType;
}
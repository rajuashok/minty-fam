import { SignUp } from "./signup";

export interface UserType {
  email: string;
  name?: string;
  playaName?: string;
  signups: SignUp[];
}
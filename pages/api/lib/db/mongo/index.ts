import { DB } from "..";
import { UserType } from "../../../../../common/types/user";
import { connectToDatabase } from "./core";


class MongoDB implements DB {
  async readUser(email: string): Promise<UserType> {
    try {
      let { db } = await connectToDatabase();

      let users = await db
        .collection("user")
        .find({ email })
        .toArray();
      if (users.length == 0) {
        return null;
      } else {
        const user = users[0];
        return  {
          email: user["email"],
          name: user["name"],
          firstYear: user["firstYear"]
        }
      }
    } catch (e) {
      throw new Error(`Failed to find user with email: ${email} in database. Error: ${e}.`)
    }
  }

  async updateUser(email: string, user: UserType): Promise<UserType> {
    try {
      if (email != user.email) throw new Error(`Cannot change email of user. ${email} != ${user.email}`);

      let { db } = await connectToDatabase();

      await db.collection('user')
        .updateOne(
          {
            email
          },
          {
            $set: {
              ...user
            }
          }
        );

      return await this.readUser(email);
    } catch (e) {
      throw new Error(`Failed to update user with email: ${email} in database. Error: ${e}`);
    }
  }
}

export default MongoDB;
import { DB } from "..";
import { UserType } from "../../../../../common/types/user";
import { connectToDatabase } from "./core";

const USER_TABLE_NAME = 'user';
const SIGNUP_TABLE_NAME = 'signup';

class MongoDB implements DB {
  async readUser(email: string): Promise<UserType> {
    try {
      let { db } = await connectToDatabase();

      const users = await db
        .collection(USER_TABLE_NAME)
        .find({ email })
        .toArray();
      if (users.length == 0) {
        return null;
      } else {
        const year = (new Date()).getFullYear();
        const signupRow = await db
          .collection(SIGNUP_TABLE_NAME)
          .findOne({ email, year });
        let signups = [];
        if (signupRow != null) {
          signups = [{
            email,
            year,
            phone: signupRow["phone"],
            arriveDate: signupRow["arriveDate"],
            leaveDate: signupRow["leaveDate"],
            hasTicket: signupRow["hasTicket"],
            signupTimestamp: signupRow["signupTimestamp"],
            accepted: signupRow["accepted"]
          }];
        }

        const user = users[0];
        return  {
          email: user["email"],
          name: user["name"],
          playaName: user["playaName"],
          signups
        };
      }
    } catch (e) {
      throw new Error(`Failed to find user with email: ${email} in database. Error: ${e}.`)
    }
  }

  async updateUser(email: string, user: UserType): Promise<UserType> {
    try {
      if (email != user.email) throw new Error(`Cannot change email of user. ${email} != ${user.email}`);

      let { db } = await connectToDatabase();
      // TODO(ashok): Update the signup table as well.

      await db.collection('user')
        .updateOne(
          {
            email
          },
          {
            $set: {
              ...user
            }
          },
          {
            upsert: true
          }
        );

      return await this.readUser(email);
    } catch (e) {
      throw new Error(`Failed to update user with email: ${email} in database. Error: ${e}`);
    }
  }
}

export default MongoDB;
import { DB } from ".";
import { UserType } from "../../../../common/types/user";
import { JsonDB } from 'node-json-db';
import { Config } from "node-json-db/dist/lib/JsonDBConfig";


interface UsersDB {
  [key: string]: UserType;
}

const users: UsersDB = {
  'deville75@gmail.com': {
    email: 'deville75@gmail.com',
    name: 'Ashok Raju',
  }
}

class JsonDatabase implements DB {
  db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config("jsondb_minty-fam", true, false, '/'))
    Object.keys(users).forEach(email => {
      this.db.push(`/users/${email}`, users[email]);
    });
  }

  async readUser(email: string): Promise<UserType> {
    return this.db.getObject<UserType>(`/users/${email}`);
  }

  async updateUser(email: string, user: UserType): Promise<UserType> {
    if (user.email != email) {
      throw new Error(`Can't change email. ${email} != ${user.email}`);
    }

    this.db.push(`/users/${email}`, user);
    return user
  }
}

export default JsonDatabase;
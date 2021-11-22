import { DB } from ".";
import { UserType } from "../../../../common/types/user";

interface UsersDB {
  [key: string]: UserType;
}

const users: UsersDB = {
  'deville75@gmail.com': {
    email: 'deville75@gmail.com',
    name: 'Ashok Raju',
    firstYear: 2013
  }
}

class DummyDatabase implements DB {

  constructor() {
  }

  async readUser(email: string): Promise<UserType> {
    return users[email] || {email, firstYear: 1, name: 'Bot'};
  }

  async updateUser(email: string, user: UserType): Promise<UserType> {
    return user;
  }
}

export default DummyDatabase;
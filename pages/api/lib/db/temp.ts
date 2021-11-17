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

class TempDB implements DB {
  users: UsersDB;

  constructor() {
    this.users = users
  }

  readUser(email: string) {
    return this.users[email];
  }

  updateUser(email: string, user: UserType) {
    this.users[email] = user;
  }
}

export default new TempDB();
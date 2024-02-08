import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

export class Encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
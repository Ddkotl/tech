import { dataBase } from "@/lib/db_conect";
import { UserEntity } from "../_domain/types";

export class UserRepository {
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dataBase.user.create({
      data: user,
    });
  }
}

export const userRepository = new UserRepository();

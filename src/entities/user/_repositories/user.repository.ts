import { dataBase } from "@/shared/lib/db_conect";
import { Profile, UserEntity, UserId } from "../_domain/types";

export class UserRepository {
  async getUserById(userId: UserId): Promise<UserEntity> {
    return await dataBase.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await dataBase.user.findMany();
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dataBase.user.create({
      data: user,
    });
  }
  async updateProfile(
    userId: UserId,
    data: Partial<Profile>,
  ): Promise<Profile> {
    return await dataBase.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
    });
  }
}

export const userRepository = new UserRepository();

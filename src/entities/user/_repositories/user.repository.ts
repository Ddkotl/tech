import { dataBase } from "@/shared/lib/db_conect";
import { Profile, UserEntity, UserId } from "../_domain/types";

export class UserRepository {
  async getUserById(userId: UserId): Promise<UserEntity> {
    try {
      return await dataBase.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await dataBase.user.findMany();
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      return await dataBase.user.create({
        data: user,
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async updateProfile(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    try {
      return await dataBase.user.update({
        where: { id: userId },
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
}

export const userRepository = new UserRepository();

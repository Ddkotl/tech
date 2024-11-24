import { AuthorizationError } from "@/shared/lib/errors";
import { SessionEntity, UserEntity } from "../_domain/types";
import { createUserAbility } from "../_domain/user-ability";

import { userRepository } from "../_repositories/user.repository";

export class GetAllUsersUseCase {
  async exec(session: SessionEntity): Promise<UserEntity[]> {
    const userAbility = createUserAbility(session);
    if (!userAbility.canGetAllUsers()) {
      throw new AuthorizationError();
    }
    return await userRepository.getAllUsers();
  }
}

export const getAllUsersUseCase = new GetAllUsersUseCase();

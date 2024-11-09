import { AuthorizationError } from "@/lib/errors";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import { createUserAbility } from "../_domain/user-ability";

import { userRepository } from "../_repositories/user.repository";

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async exec({ userId, data, session }: UpdateProfile): Promise<Profile> {
    const userAbility = createUserAbility(session);
    if (!userAbility.canUpdateProfile(userId)) {
      throw new AuthorizationError();
    }
    return await userRepository.updateProfile(userId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();

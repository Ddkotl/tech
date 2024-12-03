import { ROLES, SessionEntity } from "@/entities/user";

export const createPostAbility = (session: SessionEntity) => ({
  canCreatePost: () => {
    return session.user.role === ROLES.ADMIN;
  },
  canUpdatePost: () => {
    return session.user.role === ROLES.ADMIN;
  },
  canDeletePost: () => {
    return session.user.role === ROLES.ADMIN;
  },
});

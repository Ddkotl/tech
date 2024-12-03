import { ROLES, SessionEntity, UserId } from "@/entities/user";

export const createLikeAbility = (session: SessionEntity) => ({
  canCreateLike: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
  canDeleteLike: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
});

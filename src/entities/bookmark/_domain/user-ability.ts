import { ROLES, SessionEntity, UserId } from "@/entities/user";

export const createBookmarkAbility = (session: SessionEntity) => ({
  canCreateBookmark: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
  canDeleteBookmark: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
});

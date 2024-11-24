import { ROLES, SessionEntity, UserId } from "./types";

export const createUserAbility = (session: SessionEntity) => ({
  canGetAllUsers: () => {
    return session.user.role === ROLES.ADMIN;
  },
  canGetUser: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
  canUpdateProfile: (userId: UserId) => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
});

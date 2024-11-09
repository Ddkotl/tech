// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { SessionEntity, UserEntity } from "./_domain/types";

declare module "next-auth" {
  interface Session extends SessionEntity {
    user: {
      id: UserId;
      email: string;
      role: Role;
      name?: string | null;
      image?: string | null;
    };
    expires: string;
  }
  interface User extends UserEntity {
    id: UserId;
    email: string;
    emailVerified?: Date | null;
    role: Role;
    name?: string | null;
    image?: string | null;
  }
}

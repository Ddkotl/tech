import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import MailRuProvider from "next-auth/providers/mailru";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/lib/config/private";
import { AuthOptions } from "next-auth";
import { createUserUseCase } from "./_use-cases/create-user";
import { dataBase } from "@/shared/lib/db_conect";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserEntity } from "./_domain/types";

const prismaAdapter = PrismaAdapter(dataBase);
export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: async (user: UserEntity) => {
      const newUser = await createUserUseCase.exec(user);

      return {
        ...newUser,
      };
    },
  } as AuthOptions["adapter"],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
  },
  providers: compact([
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: privateConfig.GITHUB_ID,
        clientSecret: privateConfig.GITHUB_SECRET,
      }),
    privateConfig.GOOGLE_CLIENT_ID &&
      privateConfig.GOOGLE_CLIENT_SECRET &&
      GoogleProvider({
        clientId: privateConfig.GOOGLE_CLIENT_ID,
        clientSecret: privateConfig.GOOGLE_CLIENT_SECRET,
      }),
    privateConfig.YANDEX_CLIENT_ID &&
      privateConfig.YANDEX_CLIENT_SECRET &&
      YandexProvider({
        clientId: privateConfig.YANDEX_CLIENT_ID,
        clientSecret: privateConfig.YANDEX_CLIENT_SECRET,
      }),
    privateConfig.MAILRU_CLIENT_ID &&
      privateConfig.MAILRU_CLIENT_ID &&
      MailRuProvider({
        clientId: privateConfig.MAILRU_CLIENT_ID,
        clientSecret: privateConfig.MAILRU_CLIENT_SECRET,
      }),
  ]),
};

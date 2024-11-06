import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import MailRuProvider from "next-auth/providers/mailru";
import { dataBase } from "@/lib/db_conect";
import { compact } from "lodash-es";
import { privateConfig } from "@/lib/config/private";
import { AuthOptions } from "next-auth";

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dataBase) as AuthOptions["adapter"],
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

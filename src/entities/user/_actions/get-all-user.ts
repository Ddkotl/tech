import { dataBase } from "@/shared/lib/db_conect";
import { User } from "@prisma/client";

export async function getAllUsers(): Promise<User[]> {
  try {
    return await dataBase.user.findMany();
  } catch {
    return [];
  }
}

import { User } from "@prisma/client";
import { UserType } from "./prisma/prisma-users-repository";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: UserType): Promise<User>;
}

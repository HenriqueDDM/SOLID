import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users-repository";

export type UserType = {
  name: string;
  email: string;
  password_hash: string;
};

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: UserType) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
    });

    return user;
  }
}

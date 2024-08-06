import { User } from "@prisma/client";

export type UserType = {
  name: string;
  email: string;
  password_hash: string;
};

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: UserType): Promise<User>;
}

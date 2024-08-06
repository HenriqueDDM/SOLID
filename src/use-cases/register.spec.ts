import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await registerUseCase.handle({
      name: "Henrique",
      email: "henrique@email.com.br",
      password: "12344567",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.handle({
      name: "Henrique",
      email: "henrique@email.com.br",
      password: "12344567",
    });

    const isPasswordCorrectlyHashed = await compare(
      "12344567",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const email = "henrique@email.com.br";

    await registerUseCase.handle({
      name: "Henrique",
      email,
      password: "12344567",
    });

    await expect(() =>
      registerUseCase.handle({
        name: "Henrique",
        email,
        password: "12344567",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

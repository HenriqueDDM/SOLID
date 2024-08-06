import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Henrique",
      email: "henrique@email.com.br",
      password_hash: await hash("12344567", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "henrique@email.com.br",
      password: "12344567",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not authenticate with the wrong email", async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: "henrique@email.com.br",
        password: "12344567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not authenticate with the wrong password", async () => {
    await usersRepository.create({
      name: "Henrique",
      email: "henrique@email.com.br",
      password_hash: await hash("12344567", 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: "henrique@email.com.br",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

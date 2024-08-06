import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let getProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get a user profile", async () => {
    const userCreated = await usersRepository.create({
      name: "Henrique",
      email: "henrique@email.com.br",
      password_hash: await hash("12344567", 6),
    });

    const { user } = await getProfileUseCase.execute({
      userId: userCreated.id,
    });

    expect(user.name).toEqual("Henrique");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      getProfileUseCase.execute({
        userId: "Not-exists-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

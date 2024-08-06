import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search.gyms";

let gymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
      title: "Javascript",
    });
    await gymsRepository.create({
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
      title: "Typescript",
    });

    const { gyms } = await searchGymsUseCase.handle({
      query: "Typescript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Typescript" })]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        description: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: null,
        title: `Javascript Gym ${i}`,
      });
    }

    const { gyms } = await searchGymsUseCase.handle({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym 21" }),
      expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});

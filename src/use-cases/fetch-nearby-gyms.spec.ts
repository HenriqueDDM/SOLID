import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsUseCase: FetchNearbyUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymsUseCase = new FetchNearbyUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
      title: "Near Gym",
    });
    await gymsRepository.create({
      description: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
      phone: null,
      title: "Far Gym",
    });

    const { gyms } = await fetchNearbyGymsUseCase.handle({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});

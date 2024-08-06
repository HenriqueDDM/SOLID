import { Gym } from "@prisma/client";

export type GymType = {
  id?: string;
  title: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  description: string | null;
};

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: GymType): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}

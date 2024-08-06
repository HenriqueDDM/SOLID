import { CheckIn } from "@prisma/client";

export type CheckInType = {
  gym_id: string;
  user_id: string;
  validated_at?: Date;
};

export interface CheckInsRepository {
  create(data: CheckInType): Promise<CheckIn>;
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}

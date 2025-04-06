import { UserEntity } from './user.entity';
export class UserProfileResponseDto {
  id: number;
  email: string;
  createdDate: Date;
  updatedDate: Date;

  static fromUser(user: UserEntity | null): UserProfileResponseDto {
    const { id, email, createdAt, updatedAt } = user;
    return {
      id,
      email,
      createdDate: createdAt,
      updatedDate: updatedAt,
    };
  }
}

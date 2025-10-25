export type UserRole = 'ADMIN' | 'USER';

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type JwtToken = {
  value: string;
  expiresIn: number;
};

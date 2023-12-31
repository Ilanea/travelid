//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  accessToken: string;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

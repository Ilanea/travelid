//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';


export type UserResponse = {
  accessToken: string;
  user: AuthUser;
};

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
};

export enum Role {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  HOTEL = 'HOTEL',
}



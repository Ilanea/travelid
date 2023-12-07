//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  accessToken: string;
  hotelsAsAdmin: Hotel;
};

type Hotel = {
  id: number;
  name: string;
  address: string;
};

export enum Role {
  ADMIN = 'ADMIN',
  HOTELADMIN = 'HOTELADMIN',
  HOTELRECEPTIONIST = 'HOTELRECEPTIONIST',
  GUEST = 'GUEST',
}

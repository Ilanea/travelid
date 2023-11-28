//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';

export type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  description?: string;
  firstName: string;
  lastName: string;
  email: string;
};

/* export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
 */

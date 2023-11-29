//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';

export type Rewards = {
  id: number;
  name: string;
  validFrom: string;
  validUntil: string;
  description: string;
  price: number;
  active: boolean;
};

/* export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
 */

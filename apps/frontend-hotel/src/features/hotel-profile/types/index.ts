//export type Role = 'ADMIN' | 'GUEST' | 'HOTEL';

export type Property = {
  id: number;
  name: string;
};

export type PropertyCategory = {
  id: number;
  name: string;
  url: string;
  description?: string;
  subCategories: PropertySubCategory[];
};

export type PropertySubCategory = {
  id: number;
  name: string;
  description?: string;
  properties: Property[];
};

export type HotelProfile = {
  id: number;
  name: string;
  description?: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  isActive: boolean;
  properties: Property[];
  urls: string[];
};

export type UpdateHotelProfile = {
  name?: string;
  description?: string;
  subtitle?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  properties?: Property[];
  urls?: string[];
};

/* export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
 */

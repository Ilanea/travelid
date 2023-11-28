import { Role } from '@prisma/client';

export const admin = {
  email: 'admin@bonaway.com',
  passwordHash:
    '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
  firstName: 'Admin',
  lastName: 'Bonaway',
  role: Role.ADMIN,
};

export const hotelUsers = [
  {
    email: 'maria@sacher.com',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Maria',
    lastName: 'Huber',
    role: Role.HOTELADMIN,
  },
  {
    email: 'klaus@sacher.com',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Klaus',
    lastName: 'Mair',
    role: Role.HOTELRECEPTIONIST,
  },
];

export const guestUsers = [
  {
    email: 'herbert@gast.at',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Herbert',
    lastName: 'Huber',
  },
  {
    email: 'sarah@gast.at',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Sarah',
    lastName: 'Mair',
  },
  {
    email: 'wolfgang@gast.at',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Wolfgang',
    lastName: 'Moser',
  },
  {
    email: 'christine@gast.at',
    passwordHash:
      '$argon2id$v=19$m=65536,t=3,p=4$+CI2IKguvfV7k368rMJOBg$1icXm+c/bu7dm5Y3EaWHWEsqsG9W50bRc72uVu/2Yyg',
    firstName: 'Christine',
    lastName: 'Schmidt',
  },
];

export const hotel = {
  name: 'Hotel Sacher',
  address: 'Philharmoniker Str. 4, 1010 Wien',
  phoneNumber: '+43 1 514 560',
  email: 'info@sacher.com',
  description:
    'Das Hotel Sacher ist ein traditionsreiches Grandhotel in der Wiener Innenstadt. Es befindet sich am Philharmonikerplatz im 1. Wiener Gemeindebezirk Innere Stadt und ist bekannt für seine Torte, die Sachertorte.',
};

export const bookings = [
  {
    price: 100,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 1,
  },
  {
    price: 200,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 2,
  },
  {
    price: 300,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 3,
  },
  {
    price: 400,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 4,
  },
];

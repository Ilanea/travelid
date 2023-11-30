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
  hotelProperties: [{ id: 1 }, { id: 2 }, { id: 12 }, { id: 24 }, { id: 25 }],
};

export const bookings = [
  {
    price: 100,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 1,
    status: 'BOOKED',
    type: 'PRIVATE',
  },
  {
    price: 200,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 2,
    status: 'CANCELLED',
    type: 'PRIVATE',
  },
  {
    price: 300,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 3,
    status: 'BOOKED',
    type: 'BUSINESS',
  },
  {
    price: 400,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-05-03'),
    hotelId: 1,
    userId: 4,
    status: 'BOOKED',
    type: 'BUSINESS',
  },
];

export const rewards = [
  {
    name: 'Free breakfast',
    description: 'Enjoy a free breakfast at our hotel',
    image:
      'https://www.akademie-sport-gesundheit.de/assets/images/d/massage-techniken2-c86b68b0.webp',
    price: 100,
    validFrom: new Date('2021-05-01'),
    validUntil: new Date('2021-05-03'),
    hotelId: 1,
    active: true,
  },
  {
    name: 'Oil massage',
    description: 'Enjoy a free oil massage at our hotel',
    image:
      'https://www.akademie-sport-gesundheit.de/assets/images/d/massage-techniken2-c86b68b0.webp',
    price: 100,
    validFrom: new Date('2021-05-01'),
    validUntil: new Date('2021-05-03'),
    hotelId: 1,
    active: true,
  },
  {
    name: 'Private wellness area',
    description: 'Enjoy a free private wellness area at our hotel',
    image:
      'https://www.akademie-sport-gesundheit.de/assets/images/d/massage-techniken2-c86b68b0.webp',
    price: 100,
    validFrom: new Date('2021-05-01'),
    validUntil: new Date('2021-05-03'),
    hotelId: 1,
    active: false,
  },
  {
    name: 'Cocktail voucher',
    description: 'Enjoy a free cocktail at our hotel',
    image:
      'https://www.akademie-sport-gesundheit.de/assets/images/d/massage-techniken2-c86b68b0.webp',
    price: 100,
    validFrom: new Date('2021-05-01'),
    validUntil: new Date('2021-05-03'),
    hotelId: 1,
    active: true,
  },
];

export const properties = [
  {
    name: 'Facilities',
    url: 'facilities',
    subCategories: [
      {
        name: 'Spa',
        properties: [
          {
            name: 'Sauna',
          },
          {
            name: 'Steam bath',
          },
          {
            name: 'Infrared cabin',
          },
          {
            name: 'Relaxation room',
          },
          {
            name: 'Massages',
          },
          {
            name: 'Cosmetic treatments',
          },
          {
            name: 'Fitness room',
          },
          {
            name: 'Yoga room',
          },
        ],
      },
      {
        name: 'Parking',
        properties: [
          {
            name: 'Parking garage',
          },
          {
            name: 'Parking lot',
          },
          {
            name: 'Parking spaces for disabled people',
          },
          {
            name: 'Charging station for electric cars',
          },
          {
            name: 'Bicycle parking',
          },
          {
            name: 'Bicycle rental',
          },
        ],
      },
    ],
  },
  {
    name: 'Food & Drink',
    url: 'food-and-drink',
    subCategories: [
      {
        name: 'Restaurant',
        properties: [
          {
            name: 'Breakfast buffet',
          },
          {
            name: 'Breakfast à la carte',
          },
          {
            name: 'Breakfast in the room',
          },
          {
            name: 'Half board',
          },
          {
            name: 'Full board',
          },
          {
            name: 'À la carte restaurant',
          },
          {
            name: 'Buffet restaurant',
          },
          {
            name: 'Vegetarian food',
          },
          {
            name: 'Vegan food',
          },
          {
            name: 'Gluten-free food',
          },
          {
            name: 'Lactose-free food',
          },
          {
            name: 'Diet food',
          },
          {
            name: "Children's menu",
          },
          {
            name: 'Outdoor dining area',
          },
          {
            name: 'Room service',
          },
          {
            name: 'Special diet menus (on request)',
          },
          {
            name: 'Snack bar',
          },
          {
            name: 'Bar',
          },
          {
            name: 'Minibar',
          },
          {
            name: 'Coffee machine',
          },
          {
            name: 'Bottled water',
          },
          {
            name: 'Wine/champagne',
          },
          {
            name: 'Kid-friendly buffet',
          },
          {
            name: 'Kid meals',
          },
          {
            name: 'Fruits',
          },
          {
            name: 'Chocolate or cookies',
          },
          {
            name: 'On-site coffee house',
          },
          {
            name: 'Breakfast options',
          },
          {
            name: 'Café on site',
          },
          {
            name: 'Fruit',
          },
          {
            name: 'Bottle of water',
          },
          {
            name: 'Wine/champagne',
          },
          {
            name: 'Kid meals',
          },
          {
            name: 'Special diet menus (on request)',
          },
          {
            name: 'Snack bar',
          },
          {
            name: 'Bar',
          },
          {
            name: 'Restaurant',
          },
          {
            name: 'Good coffee!',
          },
        ],
      },
      {
        name: 'Bar',
        properties: [
          {
            name: 'Breakfast buffet',
          },
          {
            name: 'Breakfast à la carte',
          },
          {
            name: 'Breakfast in the room',
          },
          {
            name: 'Half board',
          },
          {
            name: 'Full board',
          },
          {
            name: 'À la carte restaurant',
          },
          {
            name: 'Buffet restaurant',
          },
          {
            name: 'Vegetarian food',
          },
          {
            name: 'Vegan food',
          },
          {
            name: 'Gluten-free food',
          },
          {
            name: 'Lactose-free food',
          },
          {
            name: 'Diet food',
          },
          {
            name: "Children's menu",
          },
          {
            name: 'Outdoor dining area',
          },
          {
            name: 'Room service',
          },
          {
            name: 'Special diet menus (on request)',
          },
          {
            name: 'Snack bar',
          },
          {
            name: 'Bar',
          },
          {
            name: 'Minibar',
          },
          {
            name: 'Coffee machine',
          },
          {
            name: 'Bottled water',
          },
          {
            name: 'Wine/champagne',
          },
          {
            name: 'Fruits',
          },
          {
            name: 'Chocolate or cookies',
          },
          {
            name: 'On-site coffee house',
          },
          {
            name: 'Breakfast options',
          },
          {
            name: 'Café on site',
          },
          {
            name: 'Fruit',
          },
          {
            name: 'Bottle of water',
          },
          {
            name: 'Wine/champagne',
          },
          {
            name: 'Good coffee!',
          },
        ],
      },
    ],
  },
  {
    name: 'Services',
    url: 'services',
    subCategories: [
      {
        name: 'Reception',
        properties: [
          {
            name: 'Concierge service',
          },
          {
            name: 'Luggage storage',
          },
          {
            name: 'Ticket service',
          },
          {
            name: 'Tour desk',
          },
          {
            name: 'Currency exchange',
          },
          {
            name: 'Express check-in/check-out',
          },
          {
            name: '24-hour front desk',
          },
        ],
      },
      {
        name: 'Security',
        properties: [
          {
            name: 'Fire extinguishers',
          },
          {
            name: 'CCTV outside property',
          },
          {
            name: 'CCTV in common areas',
          },
          {
            name: 'Smoke alarms',
          },
          {
            name: 'Security alarm',
          },
          {
            name: '24-hour security',
          },
          {
            name: 'Safety deposit box',
          },
        ],
      },
    ],
  },
];

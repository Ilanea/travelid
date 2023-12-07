import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  categoryId: z.number(),
  subCategory: z.string(),
  subCategoryId: z.number(),
});

export const hotelScheme = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  subtitle: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type Hotel = z.infer<typeof hotelScheme>;

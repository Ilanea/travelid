import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
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

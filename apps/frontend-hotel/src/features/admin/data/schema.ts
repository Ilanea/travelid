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

export type Task = z.infer<typeof taskSchema>;

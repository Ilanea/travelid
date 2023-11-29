import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  validFrom: z.string(),
  validUntil: z.string(),
  price: z.number(),
  active: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;

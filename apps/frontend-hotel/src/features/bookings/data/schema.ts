import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const bookingSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  status: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

startDate: '2021-05-01T00:00:00.000Z';

export type Booking = z.infer<typeof bookingSchema>;

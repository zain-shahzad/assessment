import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(8, 'Username must be at least 3 characters long'),
  email: z.email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

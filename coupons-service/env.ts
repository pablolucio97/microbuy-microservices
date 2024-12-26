import { z } from 'zod';

export const envSchema = z.object({
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;

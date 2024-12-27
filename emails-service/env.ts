import z from 'zod';

export const envSchema = z.object({
  SEND_GRID_EMAIL_SENDER_API_KEY: z.string(),
  SEND_GRID_EMAIL_SENDER_AUTHOR: z.string(),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;

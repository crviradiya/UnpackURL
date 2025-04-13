import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type UrlInput = z.infer<typeof urlSchema>; 
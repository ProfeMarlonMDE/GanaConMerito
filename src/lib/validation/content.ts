import { z } from "zod";

export const rawMarkdownSchema = z.object({
  rawMarkdown: z.string().min(1, "rawMarkdown es obligatorio."),
});

export type RawMarkdownInput = z.infer<typeof rawMarkdownSchema>;

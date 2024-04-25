import { z } from "zod";

//api/issues/new
export const IssueFromSchema = z.object({
  title: z.string().min(1, { message: "This is required" }).max(50),
  description: z.string().min(6, { message: "This is Description" }).max(200),
});

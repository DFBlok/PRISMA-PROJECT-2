import { z } from "zod";

//api/issues/new
export const IssueFromSchema = z.object({
  title: z.string().min(1, { message: "This is required" }).max(50),
  description: z.string().min(6, { message: "This is Description" }).max(200),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

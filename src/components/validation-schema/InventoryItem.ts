import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  partNumber: z.string().min(1, { message: "Part number is required" }),
  dateReceived: z.string().min(1, { message: "Date received is required" }),
});

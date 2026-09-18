import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,14}$/,
      "Please enter a valid phone number"
    ),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date is required")
    .refine((d) => new Date(d) >= new Date(new Date().toDateString()), {
      message: "Date must be today or in the future",
    }),
  time: z.string().min(1, "Please select a time"),
  party_size: z.coerce
    .number({ error: "Party size is required" })
    .int()
    .min(1, "Party size must be at least 1")
    .max(20, "For parties over 20, please contact us directly"),
  message: z.string().max(500).optional(),
  _honeypot: z.string().max(0, "Bot detected"),
});

export type ReservationInput = z.input<typeof reservationSchema>;
export type ReservationOutput = z.output<typeof reservationSchema>;
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const clientSchema = z.object({
  name: z.string().min(1),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  terms: z.string().optional(),
  currency: z.string().optional(),
});

export const consultantSchema = z.object({
  name: z.string().min(1),
  defaultRate: z.coerce.number().min(0),
  unitType: z.string().default('hour'),
  defaultDescription: z.string().optional(),
});

export const settingsSchema = z.object({
  companyName: z.string().min(1),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  defaultTerms: z.string(),
  defaultCurrency: z.string(),
  invoicePrefix: z.string().min(1),
  footerNote: z.string().optional(),
});

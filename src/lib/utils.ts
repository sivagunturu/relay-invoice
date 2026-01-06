import { formatInTimeZone } from 'date-fns-tz';
import { addMonths, addDays } from 'date-fns';

export const TIMEZONE = 'America/Chicago';

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

export function formatDate(date: Date | string, format = 'MMM dd, yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatInTimeZone(d, TIMEZONE, format);
}

export function getNextMonthStart(dayOfMonth: number): Date {
  const now = new Date();
  const next = addMonths(now, 1);
  next.setDate(dayOfMonth);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function calculateDueDate(issueDate: Date, terms: string): Date {
  const match = terms.match(/Net (\d+)/i);
  const days = match ? parseInt(match[1]) : 30;
  return addDays(issueDate, days);
}

import type { Chore } from "types";

export const getDueDate = (chore: Chore): string => {
  // Function to calculate the due date based on recurrence and unit
  const today = new Date();
  switch (chore.unit) {
    case 'days':
      return new Date(today.getTime() + chore.recurrence * 24 * 60 * 60 * 1000).toDateString();
    case 'weeks':
      return new Date(today.getTime() + chore.recurrence * 7 * 24 * 60 * 60 * 1000).toDateString();
    case 'months':
      return new Date(today.getFullYear(), today.getMonth() + chore.recurrence, today.getDate()).toDateString();
    default:
      return '';
  }
};
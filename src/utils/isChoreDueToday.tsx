import { Chore } from '../types';

const isChoreDueToday = (chore: Chore): boolean => {
  const today = new Date();
  const dueDate = new Date(chore.dueDate);

  // Extract the year, month, and day from the dueDate
  const dueYear = dueDate.getFullYear();
  const dueMonth = dueDate.getMonth();
  const dueDay = dueDate.getDate();

  // Extract the year, month, and day from today's date
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Compare the year, month, and day to check if the chore is due today
  return (
    !chore.completed &&
    dueYear === currentYear &&
    dueMonth === currentMonth &&
    dueDay === currentDay
  );
};

export default isChoreDueToday;

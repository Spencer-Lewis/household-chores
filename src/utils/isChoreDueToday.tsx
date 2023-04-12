import { Chore } from '../types';

const isChoreDueToday = (chore: Chore): boolean => {
  const today = new Date();
  const dueDate = new Date(chore.dueDate);

  // Compare the dueDate to today's date, and check if it's on or before today
  return (
    !chore.completed &&
    dueDate <= today // Check if the dueDate is on or before today
  );
};

export default isChoreDueToday;

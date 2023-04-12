import { FrequencyUnit, Room } from "types";

// Get today's date
const currentDate = new Date();

// Function to calculate due date based on recurrence and unit
const calculateDueDate = (recurrence: number, unit: FrequencyUnit, offset: number) => {
  const dueDate = new Date(currentDate);
  switch (unit) {
    case FrequencyUnit.Days:
      dueDate.setDate(currentDate.getDate() - (recurrence + offset));
      break;
    case FrequencyUnit.Weeks:
      dueDate.setDate(currentDate.getDate() - (recurrence * 7 + offset));
      break;
    case FrequencyUnit.Months:
      dueDate.setMonth(currentDate.getMonth() - (recurrence + offset));
      break;
    default:
      break;
  }
  return dueDate;
};

// Sample room data
export const sampleRooms: Room[] = [
  {
    id: 1,
    name: 'Living Room',
    chores: [
      {
        id: 1,
        name: 'Vacuum',
        recurrence: 7,
        unit: FrequencyUnit.Days,
        dueDate: calculateDueDate(7, FrequencyUnit.Days, 0),
        roomName: 'Living Room'
      },
      {
        id: 2,
        name: 'Dust',
        recurrence: 14,
        unit: FrequencyUnit.Days,
        dueDate: calculateDueDate(14, FrequencyUnit.Days, 5),
        roomName: 'Living Room'
      },
      {
        id: 3,
        name: 'Clean Windows',
        recurrence: 30,
        unit: FrequencyUnit.Days,
        dueDate: calculateDueDate(30, FrequencyUnit.Days, 13),
        roomName: 'Living Room'
      },
    ],
  },
  {
    id: 2,
    name: 'Kitchen',
    chores: [
      {
        id: 4,
        name: 'Clean Fridge',
        recurrence: 1,
        unit: FrequencyUnit.Weeks,
        dueDate: calculateDueDate(1, FrequencyUnit.Weeks, -10),
        roomName: 'Kitchen'
      },
      {
        id: 5,
        name: 'Clean Countertops',
        recurrence: 3,
        unit: FrequencyUnit.Days,
        dueDate: calculateDueDate(3, FrequencyUnit.Days, -5),
        roomName: 'Kitchen'
      },
      {
        id: 6,
        name: 'Mop Floor',
        recurrence: 7,
        unit: FrequencyUnit.Days,
        dueDate: calculateDueDate(7, FrequencyUnit.Days, 2),
        roomName: 'Kitchen'
      },
    ],
  },
  {
    id: 3,
    name: 'Bathroom',
    chores: [
      {
        id: 7,
        name: 'Clean Toilet',
        recurrence: 2,
        unit: FrequencyUnit.Weeks,
        dueDate: calculateDueDate(2, FrequencyUnit.Weeks, -16),
        roomName: 'Bathroom'
      },
      {
        id: 8,
        name: 'Scrub Bathtub',
        recurrence: 1,
        unit: FrequencyUnit.Months,
        dueDate: calculateDueDate(1, FrequencyUnit.Months, -3),
        roomName: 'Bathroom'
      }
    ]
  }
]
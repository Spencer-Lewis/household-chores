import { FrequencyUnit, Room } from "types";

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
        dueDate: new Date(),
        completed: false,
      },
      {
        id: 2,
        name: 'Dust',
        recurrence: 14,
        unit: FrequencyUnit.Days,
        dueDate: new Date(),
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Kitchen',
    chores: [
      {
        id: 3,
        name: 'Wash Dishes',
        recurrence: 1,
        unit: FrequencyUnit.Days,
        dueDate: new Date(),
        completed: false,
      },
      {
        id: 4,
        name: 'Clean Countertops',
        recurrence: 3,
        unit: FrequencyUnit.Days,
        dueDate: new Date(),
        completed: false,
      },
    ],
  },
];
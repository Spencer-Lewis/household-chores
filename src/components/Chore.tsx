import React from 'react';
import { Chore, FrequencyUnit } from '../types';

interface ChoreProps {
  chore: Chore;
}

const ChoreComponent: React.FC<ChoreProps> = ({ chore }) => {
  return (
    <div
      key={chore.id}
      className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
    >
      <h3 className="text-black text-xl font-semibold">{chore.name}</h3>
      <p className="text-black">
        <span className="font-semibold">Recurrence:</span> {chore.recurrence}{' '}
        {chore.unit === FrequencyUnit.Days
          ? 'days'
          : chore.unit === FrequencyUnit.Weeks
          ? 'weeks'
          : 'months'}
      </p>
      <p className="text-black">
        <span className="font-semibold">Due Date:</span> {chore.dueDate.toString()}
      </p>
      <p className="text-black">
        <span className="font-semibold">Completed:</span> {chore.completed ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default ChoreComponent;

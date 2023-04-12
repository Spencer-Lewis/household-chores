import React from 'react';
import { Chore, FrequencyUnit } from '../types';

interface ChoreComponentProps {
  chore: Chore;
  onEdit: (chore: Chore) => void;
}

const ChoreComponent: React.FC<ChoreComponentProps> = ({ chore, onEdit }) => {
  const handleEdit = () => {
    onEdit(chore);
  };

  return (
    <div
      key={chore.id}
      className="bg-gray-700 hover:bg-gray-600 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
    >
      <h3 className="text-white text-lg font-semibold mb-2">{chore.name}</h3>
      <p className="text-white text-sm mb-2">
        <span className="font-semibold">Recurrence:</span> {chore.recurrence}{' '}
        {chore.unit === FrequencyUnit.Days
          ? 'days'
          : chore.unit === FrequencyUnit.Weeks
          ? 'weeks'
          : 'months'}
      </p>
      <p className="text-white text-sm mb-2">
        <span className="font-semibold">Due Date:</span> {chore.dueDate.toString()}
      </p>
      <p className="text-white text-sm mb-2">
        <span className="font-semibold">Completed:</span> {chore.completed ? 'Yes' : 'No'}
      </p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none text-sm"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ChoreComponent;

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
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ChoreComponent;

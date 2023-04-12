import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      className="bg-gray-700 hover:bg-gray-600 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out relative"
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
      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 focus:outline-none text-sm"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </div>
    </div>
  );
};

export default ChoreComponent;

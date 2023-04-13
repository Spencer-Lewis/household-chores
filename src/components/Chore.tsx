import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Chore } from '../types';
import ChoreProgressBar from './ChoreProgressBar';

interface ChoreComponentProps {
  chore: Chore;
  onEdit: (chore: Chore) => void;
}

const ChoreComponent: React.FC<ChoreComponentProps> = ({ chore, onEdit }) => {
  const handleEdit = () => {
    onEdit(chore);
    setChoreEditedCount(choreEditedCount + 1)
  };

  const [choreEditedCount, setChoreEditedCount] = useState(0)

  return (
    <div
      key={chore.id}
      className="bg-gray-700 hover:bg-gray-600 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out relative"
    >
      <button
        className="text-white px-2 py-1 rounded-md hover:bg-green-700 focus:outline-none text-sm absolute top-0 right-0 mt-2 mr-2"
        onClick={handleEdit}
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <h3 className="text-white text-lg font-semibold mb-2">{chore.name}</h3>
      <ChoreProgressBar recurrence={chore.recurrence} frequencyUnit={chore.unit} dueDate={chore.dueDate}/>
    </div>
  );
};

export default ChoreComponent;

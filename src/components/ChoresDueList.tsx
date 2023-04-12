import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Chore } from '../types';

interface Props {
  choresDueToday: Chore[];
  onCheckmarkClick: (chore: Chore) => void;
}

export const ChoresDueList: React.FC<Props> = ({ choresDueToday, onCheckmarkClick }) => {
  const [selectedChoreId, setSelectedChoreId] = useState<number | null>(null);

  const handleChoreItemClick = (choreId: number) => {
    setSelectedChoreId(choreId);
  };

  const handleCheckmarkClick = (e: React.MouseEvent, chore: Chore) => {
    e.stopPropagation();
    onCheckmarkClick(chore);
  };

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {choresDueToday.length > 0 ? (
        choresDueToday.map(chore => (
          <li
            key={chore.id}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-4 rounded-md relative cursor-pointer"
            onClick={() => handleChoreItemClick(chore.id)}
          >
            <div>
              <h3 className="text-lg font-bold">{chore.name}</h3>
              <p className="text-gray-400">{chore.roomName}</p>
            </div>
            <span className={`absolute top-2 right-2 ${selectedChoreId === chore.id ? '' : 'hidden'}`}>
              <button
                type="button"
                className="p-2 rounded-full"
                onClick={(e) => handleCheckmarkClick(e, chore)}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 text-5xl"
                />
                <span className="w-2 h-2 bg-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full pointer-events-none"></span>
              </button>
            </span>
          </li>
        ))
      ) : (
        <li className="text-gray-500 flex justify-center">No chores due today</li>
      )}
    </ul>
  );
};

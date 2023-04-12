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

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {choresDueToday.length > 0 ? (
        choresDueToday.map(chore => (
          <li
            key={chore.id}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-4 rounded-md relative cursor-pointer"
            onClick={() => handleChoreItemClick(chore.id)}
          >
            {chore.name} ({chore.roomName})
            <span className={`absolute top-0 right-0 -mt-1 -mr-1 ${selectedChoreId === chore.id ? '' : 'hidden'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                onClick={() => onCheckmarkClick(chore)}
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L7 12.586l9.293-9.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fill="currentColor" // Update fill property to use 'currentColor'
                />
              </svg>
            </span>
          </li>
        ))
      ) : (
        <li className="text-gray-500 flex justify-center">No chores due today</li>
      )}
    </ul>
  );
};

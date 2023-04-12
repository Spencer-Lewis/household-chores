import React from 'react';
import isChoreDueToday from 'utils/isChoreDueToday';
import { Room } from '../types';

export const RoomList: React.FC<{ rooms: Room[] }> = ({ rooms }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <div key={room.id} className="border border-gray-700 p-4 rounded-md">
          <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
          <ul className="list-disc list-inside">
            {room.chores.map(chore => (
              <li
                key={chore.id}
                className={`${
                  isChoreDueToday(chore) ? 'text-white' : 'text-gray-500'
                } ${chore.completed ? 'line-through' : ''}`}
              >
                {chore.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
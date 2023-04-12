import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';
import isChoreDueToday from '../utils/isChoreDueToday';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <Link
          key={room.id}
          to={`/rooms/${room.id}`} // Link to RoomDetail component with room ID as URL param
          className="border border-gray-700 p-4 rounded-md"
        >
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
        </Link>
      ))}
    </div>
  );
};

export default RoomList;

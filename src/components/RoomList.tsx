import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
    {rooms.map(room => (
      <Link
        key={room.id}
        to={`/rooms/${room.id}`}
        className="bg-gray-700 p-4 rounded-md"
      >
        <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
        <h5 className="text-l font-semibold mb-4">Chores: {room.chores.length}</h5>
      </Link>
    ))}
    </div>
  );
};

export default RoomList;

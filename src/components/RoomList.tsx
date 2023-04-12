import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-gray-900 py-8 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 flex justify-center">Rooms</h1>
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
        </div>
      </div>
    </div>


  );
};

export default RoomList;

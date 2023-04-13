import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
  onDeleteRoom: (roomId: number) => void;
  deleteMode: boolean;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onDeleteRoom, deleteMode }) => {
  const handleDeleteRoom = (roomId: number) => {
    onDeleteRoom(roomId);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rooms.map(room => (
        <div key={room.id} className="bg-gray-700 p-4 rounded-md relative">
          {deleteMode && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex justify-center items-center"
              onClick={() => handleDeleteRoom(room.id)}
            >
              X
            </button>
          )}
          <Link to={`/rooms/${room.id}`}>
            <div>
              <h3 className="text-lg font-bold">{room.name}</h3>
              <p className="text-gray-400">Chores: {room.chores.length}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomList;

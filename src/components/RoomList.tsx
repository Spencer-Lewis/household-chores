import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <span className={"absolute top-2 right-2"}>
              <button
                type="button"
                onClick={() => handleDeleteRoom(room.id)}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-500 text-4xl mt-3 mr-2  "
                />
              </button>
            </span>
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

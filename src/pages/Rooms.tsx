import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoomList from 'components/RoomList';
import { sampleRooms } from 'mocks/data/rooms';
import { useState } from 'react';
import RoomModal from '../components/RoomModal';
import { Room } from '../types';

// RoomsPage component
const RoomsPage = () => {
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false); // Add state for delete mode
  const [rooms, setRooms] = useState(sampleRooms)

  const handleAddRoom = () => {
    setRoomModalOpen(true);
  };

  const onCreateRoom = (roomData: Room) => {
    setRoomModalOpen(false);
    const updatedRooms = [...rooms]
    updatedRooms.push(roomData)
    setRooms(updatedRooms);
  };

  const handleDeleteRoom = (roomId: number) => {
    const updatedRooms = rooms.filter(room => room.id !== roomId);
    setRooms(updatedRooms)
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 py-8 z-50">
        
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2 flex justify-center">Rooms</h1>
          <div className="flex justify-center">
            <button
              type="button"
              className="hover:text-red-700 text-red-500 px-4 py-2 rounded-md mr-6 mb-5"
              onClick={() => setDeleteMode(!deleteMode)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            </button>
            <button
              className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white ml-6 py-2 px-4 rounded-md mb-4 border-none focus:outline-none font-semibold text-lg font-serif"
              onClick={handleAddRoom}
            >
              <span className="animate-pulse inline-block">+</span> Add Room
            </button>
          </div>
          <RoomList rooms={rooms} onDeleteRoom={handleDeleteRoom} deleteMode={deleteMode} />
          <RoomModal
            isOpen={roomModalOpen}
            onClose={() => setRoomModalOpen(false)}
            onCreateRoom={onCreateRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
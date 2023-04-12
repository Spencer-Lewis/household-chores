import RoomList from 'components/RoomList';
import { sampleRooms } from 'mocks/data/rooms';
import { useState } from 'react';
import RoomModal from '../components/RoomModal';
import { Room } from '../types';

const RoomsPage = () => {
  const [roomModalOpen, setRoomModalOpen] = useState(false);

  const handleAddRoom = () => {
    setRoomModalOpen(true);
  };

  const onCreateRoom = (roomData: Room) => {
    // Handle room creation logic here
    // roomData will contain the data passed from RoomModal
    // Close the modal after room creation is successful
    setRoomModalOpen(false);

    sampleRooms.push(roomData)
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 py-8 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 flex justify-center">Rooms</h1>
          <div className="flex justify-center">
            <button
              className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-2 px-4 rounded-md mb-4 border-none focus:outline-none font-semibold text-lg font-serif"
              onClick={handleAddRoom}
            >
              <span className="animate-pulse inline-block">+</span> Add Room
            </button>
          </div>
          <RoomList rooms={sampleRooms} />
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

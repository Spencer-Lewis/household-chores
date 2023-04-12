import React, { useState } from 'react';
import { Room } from 'types';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (room: Room) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ isOpen, onClose, onCreateRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    if (roomName.trim() === '') {
      // Perform validation if required
      return;
    }

    let newRoom: Room = {
      id: Math.random(),
      name: roomName,
      chores: []
    }
    onCreateRoom(newRoom);
    onClose();
  };

  return (
    <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-10 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-gray-700 w-96 mx-auto mt-12 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">Add Room</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="roomName" className="block text-white font-medium mb-1">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="text-white w-full bg-gray-800 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-green-500   hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCreateRoom}
              >
                Add
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default RoomModal;

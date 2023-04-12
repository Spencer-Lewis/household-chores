import ChoreComponent from 'components/Chore';
import { sampleRooms } from 'mocks/data/rooms';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChoreModal from '../components/ChoreModal';
import { Chore, Room } from '../types';

const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>(); // Access roomId from route params
  const [choreModalOpen, setChoreModalOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [chores, setChores] = useState<Chore[]>([]);
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null); // Add selectedChore state

  useEffect(() => {
    const fetchRoomAndChores = () => {
      const roomData = sampleRooms[Number(roomId) - 1];
      setRoom(roomData);

      const choresData = roomData.chores;
      setChores(choresData);
    };

    fetchRoomAndChores();
  }, [roomId]);

  const handleAddChore = (chore: Chore, choreId?: number) => {
    chore.roomName = room?.name
    // Update handleAddChore to accept optional choreId parameter
    if (choreId != null) {
      // If choreId is provided, update existing chore
      setChores((prevChores) =>
        prevChores.map((prevChore) =>
          prevChore.id === choreId ? { ...chore, id: choreId } : prevChore
        )
      );
    } else {
      // If choreId is not provided, add new chore
      setChores([...chores, chore]);
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (

    <div className="bg-gray-800 text-white min-h-screen">
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 flex justify-center">{room.name}</h1>
          <div>
          <div className="mt-4 flex justify-center">
          <button
            className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-2 px-4 rounded-md mb-4 border-none focus:outline-none font-semibold text-lg font-serif"
            onClick={() => {
              setSelectedChore(null); // Reset selectedChore before adding a new chore
              setChoreModalOpen(true);
            }}
          >
            <span className="animate-pulse inline-block">+</span> Add Chore
          </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chores.map((chore) => (
                <ChoreComponent
                  chore={chore}
                  key={chore.id}
                  onEdit={() => {
                    setSelectedChore(chore); // Set selectedChore when editing a chore
                    setChoreModalOpen(true);
                  }}
                />
              ))}
            </div>
            <ChoreModal
              isOpen={choreModalOpen}
              onClose={() => {
                setSelectedChore(null); // Reset selectedChore when closing the ChoreModal
                setChoreModalOpen(false);
              }}
              onSave={(chore, choreId) => {
                handleAddChore(chore, choreId); // Pass choreId to handleAddChore for editing scenario
                setSelectedChore(null); // Reset selectedChore after saving a chore
                setChoreModalOpen(false);
              }}
              chore={selectedChore} // Pass selectedChore to ChoreModal for editing scenario
              room={room}
            />
          </div>
        </div>
      </div>
    </div>


    
  );
};

export default RoomDetail;

import { sampleRooms } from 'mocks/data/rooms';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChoreModal from '../components/ChoreModal';
import { Chore, FrequencyUnit, Room } from '../types';


const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>(); // Access roomId from route params
  const [choreModalOpen, setChoreModalOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [chores, setChores] = useState<Chore[]>([]);

  useEffect(() => {
    // Fetch room and chore data based on roomId
    // Example fetch implementation, replace with your actual API call
    // const fetchRoomAndChores = async () => {
    //   try {
    //     const roomResponse = await fetch(`/api/rooms/${roomId}`);
    //     const roomData = await roomResponse.json();
    //     setRoom(roomData);

    //     const choresResponse = await fetch(`/api/rooms/${roomId}/chores`);
    //     const choresData = await choresResponse.json();
    //     setChores(choresData);
    //   } catch (error) {
    //     console.error('Error fetching room and chore data:', error);
    //   }
    // };
    const fetchRoomAndChores = () => {
      const roomData = sampleRooms[Number(roomId)-1]
      setRoom(roomData);

      const choresData = roomData.chores
      setChores(choresData);
    }
    fetchRoomAndChores();
  }, [roomId]);

  const handleAddChore = (chore: Chore) => {
    setChores([...chores, chore]);
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{room.name}</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Home
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chores.map((chore) => (
          <div
            key={chore.id}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold">{chore.name}</h3>
            <p className="mt-2">
              Recurs every {chore.recurrence}{' '}
              {chore.unit === FrequencyUnit.Days
                ? 'days'
                : chore.unit === FrequencyUnit.Weeks
                ? 'weeks'
                : 'months'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          onClick={() => setChoreModalOpen(true)}
        >
          Add Chore
        </button>
      </div>
      <ChoreModal
        isOpen={choreModalOpen}
        onClose={() => setChoreModalOpen(false)}
        onSave={handleAddChore}
      />
    </div>
  );
};

export default RoomDetail;
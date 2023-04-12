import { ChoresDueList } from "components/ChoresDueList";
import { RoomList } from "components/RoomList";
import { useState } from "react";
import { Chore, Room } from "types";
import isChoreDueToday from "utils/isChoreDueToday";

const HomeDashboard = ({ rooms }: { rooms: Room[] }) => {
  // Get chores that are due today from all rooms
  const choresDueToday = rooms.reduce((acc: Chore[], room: Room) => {
    const choresDue = room.chores.filter(isChoreDueToday);
    return [...acc, ...choresDue];
  }, []);
  // State to keep track of completed chores
  const [completedChores, setCompletedChores] = useState<number[]>([]);

  // Function to mark a chore as completed
  const markChoreAsCompleted = (chore: Chore) => {
    chore.completed = true;
  };

  // Function to handle clicking on checkmark button
  const handleCheckmarkClick = (chore: Chore) => {
    markChoreAsCompleted(chore);
    setCompletedChores([...completedChores, chore.id]);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Chores Due Today</h1>
          <ChoresDueList choresDueToday={choresDueToday} onCheckmarkClick={handleCheckmarkClick} />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Rooms</h2>
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};

export default HomeDashboard;
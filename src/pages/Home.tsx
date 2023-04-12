import { ChoresDueList } from "components/ChoresDueList";
import { sampleRooms } from 'mocks/data/rooms';
import { useState } from "react";
import { Chore, FrequencyUnit, Room } from "types";
import isChoreDueToday from "utils/isChoreDueToday";

const HomeDashboard = () => {
  // Get chores that are due today from all rooms
  const choresDueToday = sampleRooms.reduce((acc: Chore[], room: Room) => {
    const choresDue = room.chores.filter(isChoreDueToday);
    return [...acc, ...choresDue];
  }, []);

  // State to keep track of completed chores
  const [completedChores, setCompletedChores] = useState<number[]>([]);

  // Function to mark a chore as completed
  const markChoreAsCompleted = (chore: Chore) => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    
    switch (chore.unit) {
      case FrequencyUnit.Days:
        dueDate.setDate(currentDate.getDate() + chore.recurrence);
        break;
      case FrequencyUnit.Weeks:
        dueDate.setDate(currentDate.getDate() + (chore.recurrence * 7));
        break;
      case FrequencyUnit.Months:
        dueDate.setDate(currentDate.getDate() + (chore.recurrence * 30));
        break;
      default:
        break;
    }
    chore.dueDate = dueDate
  };

  // Function to handle clicking on checkmark button
  const handleCheckmarkClick = (chore: Chore) => {
    markChoreAsCompleted(chore);
    setCompletedChores([...completedChores, chore.id]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 py-8 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 flex justify-center">Chores Due</h1>
          <ChoresDueList choresDueToday={choresDueToday} onCheckmarkClick={handleCheckmarkClick} />
        </div>
      </div>
    </div>
  );
  
};

export default HomeDashboard;

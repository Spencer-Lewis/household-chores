import { Link } from 'react-router-dom';
import { Chore, Room } from '../types';
import isChoreDueToday from '../utils/isChoreDueToday';

const HomeDashboard = ({ rooms }: { rooms: Room[] }) => {
  // Get chores that are due today from all rooms
  const choresDueToday = rooms.reduce((acc: Chore[], room: Room) => {
    const choresDue = room.chores.filter(isChoreDueToday);
    return [...acc, ...choresDue];
  }, []);

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Chores Due Today</h1>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {choresDueToday.length > 0 ? (
              choresDueToday.map(chore => (
                <li
                  key={chore.id}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                >
                  {chore.name} ({chore.roomName})
                </li>
              ))
            ) : (
              <li className="text-gray-500">No chores due today</li>
            )}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Rooms</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map(room => (
            <div
              key={room.id}
              className="border border-gray-300 p-4 rounded-md text-center"
            >
              <h3 className="text-xl font-bold mb-4">{room.name}</h3>
              <p className="text-lg mb-4">Chores: {room.chores.length}</p>
              <Link
                to={`/room/${room.id}`}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                View Room
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default HomeDashboard;
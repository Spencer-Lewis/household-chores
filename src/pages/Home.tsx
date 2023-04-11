import { Link } from 'react-router-dom';
import { Room } from '../types';

const HomeDashboard = ({ rooms }: { rooms: Room[] }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border border-gray-300 p-4 rounded-md text-center"
          >
            <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
            <p className="text-lg mb-4">Chores: {room.chores.length}</p>
            <Link
              to={`/room/${room.id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              View Room
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDashboard;

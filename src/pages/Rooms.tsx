import RoomList from "components/RoomList";
import { sampleRooms } from 'mocks/data/rooms';

const RoomsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Rooms</h2>
      <RoomList rooms={sampleRooms} />
    </div>
  );
};

export default RoomsPage;

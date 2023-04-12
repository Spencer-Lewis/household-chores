import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-700 p-4 flex justify-around">
      <Link to="/" className="text-white">
        Home
      </Link>
      <Link to="/rooms" className="text-white">
        Rooms
      </Link>
    </nav>
  );
};

export default NavBar;

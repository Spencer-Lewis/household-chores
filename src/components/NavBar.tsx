import { faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // Get the current route path
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-700 p-4 flex justify-around">
      <Link to="/" className={` ${!currentPath.includes('room') ? 'text-green-500' : 'text-white'}`}>
        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-lg" />
        <span className="font-bold text-lg">To Do</span>
      </Link>
      <Link
        to="/rooms"
        className={`${currentPath.includes('room') ? 'text-green-500' : 'text-white '}`}
      >
        <FontAwesomeIcon icon={faHome} className="mr-2 text-lg" />
        <span className="font-bold text-lg">Rooms</span>
      </Link>
    </nav>
  );
};

export default NavBar;

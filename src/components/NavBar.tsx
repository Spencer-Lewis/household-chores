import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // Get the current route path
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-700 p-4 flex justify-around">
      <Link to="/" className={`text-white ${currentPath === '/' ? 'text-green-500' : ''}`}>
        To Do
      </Link>
      <Link
        to="/rooms"
        className={`text-white ${currentPath.includes('/rooms') ? 'text-green-500' : ''}`}
      >
        Rooms
      </Link>
    </nav>
  );
};

export default NavBar;
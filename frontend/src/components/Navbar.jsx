import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">My App</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-green-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
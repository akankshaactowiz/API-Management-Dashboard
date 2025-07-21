import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ACT API HUB</h1>
      <div className="space-x-4">
        <Link>Home</Link>
        <Link>Products</Link>
        <Link
  to="/login"
  className="px-6 py-2 rounded-xl bg-blue-700/100 backdrop-blur-md text-white font-semibold shadow-md hover:bg-blue-800 transition-all duration-300 border border-white/20"
>
  Get Started
</Link>

        
      </div>
    </nav>
  );
};

export default Navbar;
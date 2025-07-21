import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  console.log("Login form state:", form);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg('');
  try {
    const res = await fetch('http://172.28.171.64:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify(form),
      
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Login successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMsg(`:x: ${data.message || "Login failed"}`);
    }
  } catch (err) {
    setMsg(' Error connecting to server');
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side (Visual) */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white flex flex-col justify-center items-center p-10">
        {/* <div className="text-4xl font-bold mb-4">🌐 MyApp</div> */}
        <h1 className="text-5xl font-bold leading-tight mb-2">
          Scalable infrastructure. Developer-friendly APIs. Get started today.
        </h1>

      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center items-center px-8 py-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>
          
        {msg && <p className="text-sm text-center text-red-500 mb-4">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
               name='email'
               onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
              name='password'
                onChange={handleChange}
            placeholder="Password"
                type="password"

                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
            onSubmit={handleSubmit}
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
            >
              Sign in
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>

          <div className="flex justify-between text-sm text-gray-500 mt-6">
           <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

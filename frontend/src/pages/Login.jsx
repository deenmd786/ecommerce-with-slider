import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import fetchData from '../utils/api'; // Ensure this import is correct
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearUserDetail, setUserDetail } from '../features/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  // Function to simulate session expiration after 1 minute
  const startSessionTimeout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Session Expired!');
      }, 3600000); // 60 seconds = 60000 milliseconds
    });
  };

  // Function to handle session expiration and redirect
  const handleSessionExpiration = async () => {
    try {
      const result = await startSessionTimeout(); // Wait for session to expire
      toast.info(result); // Show session expiration message
      dispatch(clearUserDetail());
      navigate('/login');
    } catch (err) {
      console.error('Error handling session expiration:', err);
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetchData('/auth/login', 'POST', { email, password }, true);
      dispatch(setUserDetail(response.user.user));
      setError(''); // Clear error on success
      toast.success('Logging in successfully.');
      navigate('/'); // Redirect or perform any additional actions after successful login
      // Start session timeout after login
      handleSessionExpiration(); 
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.'); // Handle fetch errors
    }
  };
  
  return (
    <div className="flex justify-center sm:items-center min-h-[75vh] p-3 bg-gray-200">
      <div className="bg-white min-h-[60vh] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 pt-8 text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <CustomButton name="Login" type="submit" />
          </div>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

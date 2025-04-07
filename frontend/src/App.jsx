import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes'; // Import AppRoutes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import fetchData from './utils/api';
import { setUserDetail } from './features/userSlice';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {    
    const getUserDetails = async () => {
      try {
        const user = await fetchData('/auth/userdetail', 'GET', null, true);
        dispatch(setUserDetail(user));        
        
      } catch (error) {
       
        console.error('Error fetching user details:', error); // Log any errors
        
      }
    };
  
    getUserDetails();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <main className=' bg-slate-100 pt-16'>
      <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
};

export default App;

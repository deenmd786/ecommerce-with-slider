import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* Parent Route for Admin Panel */}
      <Route path="/admin-panel" element={<AdminPanel />}>
        {/* Nested Child Routes under Admin Panel */}
        <Route path="/admin-panel/all-users" element={<AllUsers />} />
        <Route path="/admin-panel/all-products" element={<AllProducts />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product-category/:category" element={<CategoryProduct />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
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

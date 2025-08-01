import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './component/Navbar'; 
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/order.jsx';
import { ToastContainer } from 'react-toastify';
import Ai from './component/Ai.jsx';


function App() {
  const { userData } = useContext(userDataContext);
  let location = useLocation();


  return (
    <>
      <ToastContainer />
      {userData && <Navbar />}
      <Routes>
        <Route path='/login' 
          element={userData ? <Navigate to={location.state?.from || "/"} /> : <Login />} 
        />
        <Route path='/signup' 
          element={userData ? <Navigate to={location.state?.from || "/"} /> : <Registration />} 
        />
        <Route path='/' 
          element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route path='/about' 
          element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route path='/collection' 
          element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route path='/product' 
          element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route path='/contact' 
          element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route path='/productdetail/:productId' 
        element={userData ? <ProductDetail/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
        
        <Route path='/cart' 
        element={userData ? <Cart/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
        
        <Route path='/placeorder' 
        element={userData ? <PlaceOrder/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

        <Route path='/order' 
        element={userData ? <Order/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
      </Routes>
      <Ai/>
    </>
  );
}

export default App;

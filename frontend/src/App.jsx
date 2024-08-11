import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Closet from './pages/Closet';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import ViewDetails from './components/ViewDetails/ViewDetails';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import UpdateCloth from "./pages/UpdateCloth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-cloths' element={<Closet />} />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/get-byid-public/:clothid' element={<ViewDetails />} />
        <Route path="/update-cloth/:clothid" element={<UpdateCloth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

//rafc arrow function
//rfce functional
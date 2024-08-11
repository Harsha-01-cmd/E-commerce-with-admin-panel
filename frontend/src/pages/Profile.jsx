import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import Favourite from '../components/Profile/Favourite';
import OrderHistory from '../components/Profile/OrderHistory';
import AllOrders from '../components/Profile/AllOrders';
import AddCloth from '../components/Profile/AddCloth';
import { useSelector } from 'react-redux';

const Profile = () => {
  const role = useSelector((state) => state.auth.role);
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/getuserinfo",
        { headers });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-zinc-900 flex flex-col md:flex-row h-auto py-8">
      <div className="w-full flex justify-center ml-4 md:w-1/4 mb-4">
        {!profile && <Loader />}
        {profile && <Sidebar data={profile} />}
      </div>
      <div className="w-full md:w-3/4 flex justify-center items-center">
        <Routes>
          <Route index element={role === "user" ? <Favourite /> : <AllOrders />} />
          <Route path='order-history' element={<OrderHistory />} />
          {role === "admin" && <Route path='add-cloth' element={<AddCloth />} />}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

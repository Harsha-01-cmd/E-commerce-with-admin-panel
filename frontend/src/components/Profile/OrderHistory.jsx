import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import ClothCardIn from "../ClothCard/ClothCardIn";
import Loader from '../Loader/Loader';

const OrderHistory = () => {
   const [his, setHis] = useState([]);
   const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
   };

   useEffect(() => {
      const fetch = async () => {
         try {
            const res = await axios.get("http://localhost:1000/api/v1/order-history",
            { headers });
            console.log('Fetched History:', res.data.data); 
            setHis(res.data.data);
         } catch (error) {
            console.error("Error fetching Ordered items:", error);
         }
      };
      fetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []); 

   return (
      <div className="container mx-auto px-4">
      {!his && <p className="text-white text-center mt-4"><Loader/></p>} 
      {his.length===0 && <p className="text-white text-center mt-4">No Ordered Items</p>} 
        {his.length > 0 && (<div className='text-white text-center mt-4"'>Order History</div>) && his.map((item, i) => (
          <div key={i} className="w-35 h-30 mt-1 px-2 mb-4">
            <ClothCardIn data={item.cloth} ordered={true} order={item}/> 
            {/* item.cloth kyuki we have populated path as cloth */}
          </div>
        ))}
      </div>
   );
}

export default OrderHistory;


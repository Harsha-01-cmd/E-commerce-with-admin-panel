import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import ClothCardIn from "../ClothCard/ClothCardIn";
import Loader from '../Loader/Loader';

const AllOrders = () => {
   const [his, setHis] = useState([]);
   const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
   };

   useEffect(() => {
      const fetch = async () => {
         try {
            const res = await axios.get("http://localhost:1000/api/v1/all-orders",
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

   const handleStatusChange = async (orderId, newStatus) => {
      try {
         const res = await axios.put(
            `http://localhost:1000/api/v1/update-status/${orderId}`,
            { status: newStatus },
            { headers }
         );
         setHis(his.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
         console.log('Order status updated:', res.data.message);
      } catch (error) {
         console.error("Error updating order status:", error);
      }
   };

   return (
      <div className="container mx-auto px-4">
         {!his && <p className="text-white text-center mt-4"><Loader/></p>} 
         {his.length === 0 && <p className="text-white text-center mt-4">No Ordered Items</p>} 
         {his.length > 0 && (
            <div>
               <div className='text-white text-center mt-4'>Order History</div>
               {his.map((item, i) => (
                  <div key={i} className="w-35 h-30 mt-1 px-2 mb-4">
                     <ClothCardIn 
                        data={item.cloth} 
                        ordered={true} 
                        order={item}
                        onStatusChange={handleStatusChange} 
                     />
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default AllOrders;
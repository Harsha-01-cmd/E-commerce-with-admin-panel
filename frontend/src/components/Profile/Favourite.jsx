import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import ClothCardIn from "../ClothCard/ClothCardIn";
import Loader from '../Loader/Loader';

const Favourite = () => {
   const [fav, setFav] = useState([]);
   const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
   };

   useEffect(() => {
      const fetch = async () => {
         try {
            const res = await axios.get("http://localhost:1000/api/v1/get-all-fav", { headers });
            console.log('Fetched favorites:', res.data.data);
            setFav(res.data.data);
         } catch (error) {
            console.error("Error fetching favorite items:", error);
         }
      };
      fetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []); 

   return (
      <div className="container mx-auto px-4">
      {!fav && <p className="text-white text-center mt-4"><Loader/></p>} 
      {fav.length === 0 && <p className="text-white text-center mt-4">No items in Favourite</p>} 
        {fav && (<div className='text-white text-center mt-4"'>Favourites</div>) && fav.map((item, i) => (
          <div key={i} className="w-35 h-30 mt-1 px-2 mb-4">
            <ClothCardIn data={item}  favourite={true}/> 
          </div>
        ))}
      </div>
   );
}

export default Favourite;
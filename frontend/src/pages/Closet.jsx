import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import axios from "axios";
import Loader from "../components/Loader/Loader";
import ClothCard from "../components/ClothCard/ClothCard";

const Closet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-cloth-public"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className='min-h-screen bg-zinc-900 text-white px-10 py-8'>
      <div className="h-auto mt-10">
        <div className="text-4xl text-yellow-100 text-center">
          Discover The Newest of FASHION
        </div>
        {!data && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className="flex flex-col justify-center items-center px-2 md:px-15">
          <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">
            {data.length > 0 ? (
              data.map((item, i) => (
                <div key={i} className="w-full h-full p-4">
                  <ClothCard data={item} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closet;


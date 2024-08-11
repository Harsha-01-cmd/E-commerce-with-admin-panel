import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import axios from "axios";
import ClothCard from "../ClothCard/ClothCard"; // Ensure this path is correct
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-4-cloth-public"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="h-auto mt-10">
      <div className="text-4xl text-yellow-100 text-center">
        Discover The Newest of Fashion
      </div>
      {
        !data && 
        <div className="flex items-center justify-center">
          <Loader/>
        </div>
      }
      <div className="flex flex-col md:flex-row justify-center items-center px-2 md:px-10">
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.length > 0 ? (
            data.map((item, i) => (
              <div key={i}>
                <ClothCard data={item} />
              </div>
            ))
          ) : (
            <div className="flex items-cente0r justify-center">
            <Loader/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
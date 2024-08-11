import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const { clothid } = useParams();
  const navigate = useNavigate(); // For navigation

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-byid-public/${clothid}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [clothid]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleFav = async () => {
    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/add-fav",
        {}, // No data to send in the request body
        { headers } // Your headers object
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding to favorites.");
    }
  };

  const handleCart = async () => {
    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/add-cart",
        { item: data }, // Send the item data to the backend
        { headers } // Your headers object
      );
      alert(res.data.message);
      
      // Re-fetch cart data after adding the item
      const cartRes = await axios.get("http://localhost:1000/api/v1/get-all-cart", { headers });
      console.log("Fetched updated cart items response:", cartRes);
      console.log("Fetched updated cart items data:", cartRes.data.data);
      // setCart(cartRes.data.data); // Update cart state
      
      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding to cart");
    }
  };
  
  

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/delete-cloth/${clothid}`,
        { headers } // Your headers object
      );
      alert(res.data.message);
      navigate("/"); // Navigate to another page after deletion
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="bg-zinc-800 rounded-lg p-10 flex flex-col md:flex-row max-w-screen-xl mx-auto">
          <div className="bg-zinc-900 overflow-hidden rounded-l flex md:w-2/4">
            <img src={data.url} alt={data.title} className="w-full h-auto" />
            {isLoggedIn && role === "user" && (
              <div className="flex flex-col bg-zinc-800">
                <button
                  className="bg-zinc-800 text-red-200 text-2xl ml-2 mt-4"
                  onClick={handleFav}
                >
                  <FaHeart />
                </button>
                <button
                  className="bg-zinc-800 text-blue-200 text-2xl ml-2 mt-4"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
            {isLoggedIn && role === "admin" && (
              <div className="flex flex-col bg-zinc-800">
                <Link to={`/update-cloth/${clothid}`}>
                  <button className="bg-zinc-800 text-yellow-200 text-2xl ml-2 mt-4">
                    <FaRegEdit />
                  </button>
                </Link>
                <button
                  className="bg-zinc-800 text-zinc-200 text-2xl ml-2 mt-4"
                  onClick={handleDelete}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="text-white ml-4 mt-4 md:mt-0 flex-auto">
            <h3 className="text-3xl md:text-5xl text-yellow-100">
              {data.title}
            </h3>
            <p className="text-orange-600 text-lg md:text-2xl mt-4">
              ${data.price}
            </p>
            <p className="text-blue-500 mt-4">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

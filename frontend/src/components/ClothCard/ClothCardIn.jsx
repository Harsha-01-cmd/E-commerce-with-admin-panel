import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';

const ClothCardIn = ({ data, favourite, cart, ordered, order, onStatusChange, onRemoveFromCart }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    clothid: data._id
  };

  const handleRemoveFav = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/delete-fav`,
        { headers }
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("An error occurred while removing from favourites");
    }
  };

  const handleRemoveCart = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/delete-cart`,
        { headers }
      );
      alert(res.data.message);
      onRemoveFromCart(data._id); // Notify parent component to update state
    } catch (error) {
      console.error(error);
      alert("An error occurred while removing from cart");
    }
  };

  const statusOptions = ["Order Placed", "Out for Delivery", "Delivered", "Cancelled"];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(order._id, newStatus);
  };

  return (
    <div className="bg-zinc-800 rounded p-4">
      <Link to={`/get-byid/${data._id}`}>
        <div className="bg-zinc-900">
          <img src={data.url} alt={data.title} className="w-full h-auto" />
        </div>
        <div className="text-white mt-2">
          <h3 className="text-xl text-yellow-100">{data.title}</h3>
          <p className="text-blue-300">${data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className='text-center mt-2 bg-blue-600 text-sm text-yellow-100 px-4 py-2 rounded border border-zinc-800 hover:bg-zinc-900 hover:text-blue-500' onClick={handleRemoveFav}>
          Remove from Favourites
        </button>
      )}
      {cart && (
        <button className='text-center mt-2 bg-blue-600 text-sm text-yellow-100 px-4 py-2 rounded border border-zinc-800 hover:bg-zinc-900 hover:text-blue-500' onClick={handleRemoveCart}>
          Remove from Cart
        </button>
      )}
      {ordered && (
        <div className="mt-2">
          <label htmlFor="status" className="text-white">Order Status:</label>
          <select
            id="status"
            value={order.status}
            onChange={handleStatusChange}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

ClothCardIn.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  favourite: PropTypes.bool.isRequired,
  cart: PropTypes.bool.isRequired,
  ordered: PropTypes.bool.isRequired,
  order: PropTypes.object,
  onStatusChange: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func
};

export default ClothCardIn;

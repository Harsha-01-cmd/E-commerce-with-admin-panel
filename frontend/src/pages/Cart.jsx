import React, { useEffect, useState } from "react";  // eslint-disable-line no-unused-vars
import axios from "axios";
import ClothCardIn from "../components/ClothCard/ClothCardIn";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [tot, setTot] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-all-cart", { headers });
        console.log("Fetched cart items response:", res);
        console.log("Fetched cart items data:", res.data.data);
        setCart(res.data.data); // Update cart state
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  useEffect(() => {
    console.log("Cart data updated:", cart);
    if (cart.length > 0) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      setTot(total);
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      console.log("Placing order with cart items:", cart);
      const res = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      console.log("Order placed response:", res);
      navigate("/profile/order-history");
      alert(res.data.message);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Unable to Place Order");
    }
  };

  const updateCart = (removedItemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== removedItemId));
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-10 py-8">
      <div className="h-auto mt-10">
        <div className="text-4xl text-yellow-100 mb-10 text-center">Your Cart</div>
        {loading ? (
          <p className="text-white text-center">
            <Loader />
          </p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : cart.length === 0 ? (
          <p className="text-white text-center">
            No Items in Cart
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cart.map((item) => (
                <div key={item._id} className="col-span-1">
                  <ClothCardIn
                    data={item}
                    cart={true}
                    onRemoveFromCart={updateCart}
                  />
                </div>
              ))}
            </div>
            <p className="text-center mt-2 text-sm text-yellow-100 px-4 py-2 rounded border border-zinc-800 hover:text-blue-500">
              Total price: ${tot}
            </p>
            <button
              className="block text-center mt-2 bg-red-500 text-sm text-yellow-100 px-4 py-2 rounded border border-zinc-800 hover:bg-zinc-900 hover:text-blue-700"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

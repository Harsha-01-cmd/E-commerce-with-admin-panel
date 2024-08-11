import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 h-[70vh] w-[40vh] p-4 rounded flex flex-col items-center justify-center">
      <img src={data.avatar} alt="User Avatar" className="w-24 h-24" />
      <p className="mt-3 text-xl text-zinc-100 font-semibold text-center">
        {data.username}
      </p>
      <div className="w-full mt-4 h-[1px] bg-zinc-500"></div>
      {role === "user" && (
        <div className="w-full flex flex-col items-center justify-center">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/cart"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Cart
          </Link>
          <Link
            to="/profile/order-history"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
        </div>
      )}


        {role === "admin" && (
        <div className="w-full flex flex-col items-center justify-center">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-cloth"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Clothing Item
          </Link>
        </div>
      )}

      <Link
        to="/logout"
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          navigate("/");
        }}

      >
        Log Out
      </Link>
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;

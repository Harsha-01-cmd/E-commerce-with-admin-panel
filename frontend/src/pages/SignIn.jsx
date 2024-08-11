import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { authActions } from '../store/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("Enter Username and Password to proceed");
      } else {
        console.log("Submitting values:", values);  // Log the values being submitted
        const res = await axios.post("http://localhost:1000/api/v1/sign-in", values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(res.data.role));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert(res.data.message);
        console.log(res.data);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);  // Log the error response data
        alert(error.response.data.message);
      } else {
        console.log("Error:", error);  // Log the error itself
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 md:w-2/3 lg:w-1/2">
        <p className="text-zinc-200 text-2xl">Sign In</p>
        <div className="mt-4">
          <label htmlFor="username" className="text-zinc-400">
            UserName
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
            name="username"
            value={values.username}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-800 hover:text-blue-400 transition-all duration-300"
            onClick={submit}
          >
            Sign In
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Do not have an Account? &nbsp;
          <Link to="/sign-up" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

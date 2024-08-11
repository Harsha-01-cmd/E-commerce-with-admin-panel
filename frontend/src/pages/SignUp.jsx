import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "", address: "" });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.email === "" || values.username === "" || values.password === "" || values.address === "") {
        alert("All Fields are Required");
      } else {
        const res = await axios.post("http://localhost:1000/api/v1/sign-up", values);
        alert(res.data.message);
        console.log(res.data);
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 md:w-2/3 lg:w-1/2">
        <h2 className="text-zinc-200 text-2xl">Sign Up</h2>
        <div className="mt-4">
          <label htmlFor="username" className='text-zinc-400'>
            UserName
          </label>
          <input 
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='username'
            name='username'
            required 
            value={values.username}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className='text-zinc-400'>
            Email
          </label>
          <input 
            type="email"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='email'
            name='email'
            required 
            value={values.email}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className='text-zinc-400'>
            Password
          </label>
          <input 
            type="password"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='password'
            name='password'
            required 
            value={values.password}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address" className='text-zinc-400'>
            Address
          </label>
          <input 
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='address'
            name='address'
            required 
            value={values.address}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button onClick={submit} className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-800 hover:text-blue-400 transition-all duration-300'>
            Sign Up
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an Account? &nbsp;
          <Link to={"/sign-in"} className='hover:text-blue-500'>
            <u>Sign In</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

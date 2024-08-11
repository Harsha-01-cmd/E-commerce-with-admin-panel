import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [MobNav, setMobNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  let links = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Closet",
      link: "/all-cloths"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Profile",
      link: "/profile"
    },
    {
      title: "Admin-Profile",
      link: "/profile"
    }
  ];

  if (isLoggedIn === false) {
    links = links.filter(link => link.title !== "Cart" && link.title !== "Profile" && link.title !== "Admin-Profile");
  } else if (isLoggedIn && role === "admin") {
    links = links.filter(link => link.title !== "Profile");
  } else if (isLoggedIn && role === "user") {
    links = links.filter(link => link.title !== "Admin-Profile");
  }

  const handleMobileNavToggle = () => {
    setMobNav(prevState => prevState === "hidden" ? "block" : "hidden");
  };

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-3 items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <img className='h-10 w-10 me-2' src="../public/utilities/clothes-hanger.png" alt="logo" />
          <h1 className='text-2xl font-semi-bold'>ClothCouture</h1>
        </Link>
        <div className='nav-links block md:flex items-center'>
          <div className='hidden md:flex gap-8'>
            {links.map((item, i) => (
              <Link to={item.link} key={i} className='hover:text-blue-400 transition-all duration-300'>
                {item.title}
              </Link>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className='hidden md:flex gap-6 ms-7'>
              <Link to="/sign-in" className='px-2 py-1 border border-white-500 rounded hover:bg-blue-400 hover:text-zinc-800 transition-all duration-300'>Sign In</Link>
              <Link to="/sign-up" className='px-2 py-1 border border-white-500 rounded hover:bg-blue-400 hover:text-zinc-800 transition-all duration-300'>Sign Up</Link>
            </div>
          )}
          <div className="md:hidden hover:text-zinc-400" onClick={handleMobileNavToggle}>
            <SlMenu />
          </div>
        </div>
      </nav>
      <div className={`${MobNav} z-40 absolute h-[90%] items-center top-1 left-1 w-full bg-zinc-800 justify-center`}>
        <div className={` ${MobNav} mt-2 flex flex-col items-center gap-8 md:hidden `}>
          {links.map((item, i) => (
            <Link to={item.link} key={i} className='text-yellow-100 text-xl hover:text-blue-400 transition-all duration-300' onClick={handleMobileNavToggle}>
              {item.title}
            </Link>
          ))}
          {isLoggedIn === false && (
            <div className='md:hidden flex flex-col items-center gap-6 mt-7'>
              <Link to="/sign-in" className='px-2 py-1 text-yellow-100 border border-white-500 rounded hover:bg-blue-400 hover:text-zinc-800 transition-all duration-300'>Sign In</Link>
              <Link to="/sign-up" className='px-2 py-1 text-yellow-100 border border-white-500 rounded hover:bg-blue-400 hover:text-zinc-800 transition-all duration-300'>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;


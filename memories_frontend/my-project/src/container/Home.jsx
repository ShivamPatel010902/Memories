import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import { userQuery, validuserQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';
import logo from '../assets/logo.png';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [validUser, setValidUser] = useState(false)
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const newquery = validuserQuery(userInfo?.googleId);
  client.fetch(newquery).then((data) => {
    if (data.length === 1) {
      setValidUser(true)
    }
  });

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {
        validUser ? (
          <>
            <div className="hidden md:flex h-screen flex-initial">
              <Sidebar user={user && user} />
            </div>
            <div className="flex md:hidden flex-row">
              <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
                <Link to="/">
                  <img src={logo} alt="logo" className="w-28" />
                </Link>
                <Link to={`user-profile/${user?._id}`}>
                  <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
                </Link>
              </div>
              {toggleSidebar && (
                <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                  <div className="absolute w-full flex justify-end items-center p-2">
                    <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                  </div>
                  <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                </div>
              )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
              <Routes>
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/*" element={<Pins user={user && user} />} />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400"
            >
              <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-blue-600 text-9xl">Error</h1>
                  <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    <span className="text-red-500">Oops!</span> User not found
                  </h6>
                  <p className="mb-8 text-center text-gray-500 md:text-lg">
                    you are not valid user for this website
                  </p>
                  <a
                    href="#"
                    className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                  >
                    Go home
                  </a>
                </div>
              </div>
            </div>

          </>
        )
      }
    </div>
  );
};

export default Home;
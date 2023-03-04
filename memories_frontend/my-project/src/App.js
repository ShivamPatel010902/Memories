import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Home from './container/Home';
import { useEffect } from 'react';
import ValidUser from './components/ValidUser';

export default function App() {
    const navigate= useNavigate();
    
    useEffect(()=>{
        const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
         if(!user) navigate('/login');
    },[])
    return (
        <>
        <Routes>
            <Route path='login'  element={<Login/>} />
            <Route path='/*'  element={<Home/>} />
            <Route path='validuser'  element={<ValidUser/>} />
        </Routes>
        </>
    )
}

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

export default function App(){
  const logged = Boolean(localStorage.getItem('tm_token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ logged ? <Navigate to='/dashboard' /> : <Navigate to='/signin' /> } />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

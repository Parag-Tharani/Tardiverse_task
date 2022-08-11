import React from 'react';
import './App.css';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Signup } from './components/auth/signup';
import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Iskanje from './iskanje/iskanje';
import Login from './uporabniki/login';
import Registracija from './uporabniki/registracija';
import Uporabniki from './uporabniki/uporabniki';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} path="/" />
        <Route path="/iskanje" element={<Iskanje />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/uporabniki" element={<Uporabniki />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

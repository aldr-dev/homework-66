import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
   <ToastContainer position="bottom-right" theme="light" autoClose={3000} />
   <App/>
 </BrowserRouter>
);
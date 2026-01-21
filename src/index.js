import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
//import EtudiantLayout from './app/layouts/EtudiantLayout';
//import Dashboard from './app/pages/etudiant/Dashboard';
//import MesCours from './app/pages/etudiant/cours';
import { BrowserRouter } from "react-router-dom";


//import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);

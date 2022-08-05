import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'

// route pages
import LegalStuff from './components/footer-content/legal-stuff';
import PrivatePolicy from './components/footer-content/private-policy';
import AboutUs from './components/footer-content/about-us';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/legal-stuff" element={<LegalStuff />}></Route>
      <Route path="/private-policy" element={<PrivatePolicy />}></Route>
      <Route path="/about-us" element={<AboutUs />}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

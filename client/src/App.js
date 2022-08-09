import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './stylesheet/App.scss';

import HomePage from './components/HomePage';
import Dashboard from './components/dashboard-core/DashboardMain';

function App() {

  const [state, setState] = useState({
    user: null,
    transactions: [],
    competitions_created: {},
    competitions_enrolled: {},
  });

  const userFromLocalStorage = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (userFromLocalStorage) {
      setState(prev => ({
        ...prev,
        user: parseInt(userFromLocalStorage)
      }))
    }
  }, []);

  const pageRender = userFromLocalStorage? <Dashboard /> : <HomePage />

  return (
    <div className="App">
      {pageRender} 
    </div>
  );
}

export default App;

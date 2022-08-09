import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './stylesheet/App.scss';

import HomePage from './components/HomePage';
import Dashboard from './components/dashboard-core/DashboardMain';

function App() {

  const [state, setState] = useState({
    user: null,
    transactions: [],
    competitions: [],
    competitions_created: {},
    competitions_enrolled: {},
  });

  const userFromLocalStorage = localStorage.getItem("user");
  const navigate = useNavigate();

  // const getAllCompetitions = function () {
  //   axios.get('/api/competitions').then((res) => {
  //     console.log(res);
  //   })
  // }



  useEffect(() => {
    if (userFromLocalStorage) {
      Promise.all([
        axios.get("/api/competitions")
      ]).then((competitions) => {
        setState(prev => ({
          ...prev,
          user: parseInt(userFromLocalStorage),
          competitions: competitions[0].data
        }));
      });
      
    }
  }, []);

  const pageRender = userFromLocalStorage ?
    <Dashboard competitions={state.competitions}/>
    :
    <HomePage />

  return (
    <div className="App">
      {pageRender}
    </div>
  );
}

export default App;

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
    current_competition: {},
    transactions: []
  });



  const userFromLocalStorage = localStorage.getItem("user");
  const navigate = useNavigate();

  // const getAllCompetitions = function () {
  //   axios.get('/api/competitions').then((res) => {
  //     console.log(res);
  //   })
  // }



  useEffect(() => {



    

    Promise.all([
      axios.get("/api/login", {
        headers: {'Authorization': `Bearer ${userFromLocalStorage}`}})
    ]).then ((userEmailID) => {
      //console.log ("emailID[0].data", userEmailID[0].data)

      // for now (user[0].data.user) gives email and ID in user variable
      // console.log (user[0].data)

    if (userFromLocalStorage) {
      // calls for all comps, user transactions, user transactions
      Promise.all([
        axios.get("/api/competitions"),
        axios.post("/api/competitions/user_competitions", {
          data: { user: userEmailID[0].data, }
        }),
        // axios.post("/api/transactions", {
        //   data: { user: userEmailID[0].data, }
        // }),
      ]).then((comps_userComps) => {
        setState(prev => ({
          ...prev,
          user: userEmailID[0].data,
          competitions: comps_userComps[0].data,
          competitions_enrolled: comps_userComps[1].data,
          current_competition: { id: comps_userComps[1].data[0].id, name: comps_userComps[1].data[0].name }
        }));
      });

    }

  }).catch ((e) => {
    console.log (e)
  })


    // if (userFromLocalStorage) {
    //   Promise.all([
    //     axios.get("/api/competitions")
    //   ]).then((competitions) => {
    //     setState(prev => ({
    //       ...prev,
    //       user: parseInt(userFromLocalStorage),
    //       competitions: competitions[0].data
    //     }));
    //   });

    // }

  

  }, []);

  const pageRender = state.user?
    <Dashboard 
    state={state} 
    setState={setState}
    competitions={state.competitions}
    competitions_enrolled={state.competitions_enrolled}
    current_competition={state.current_competition}
    />
    :
    <HomePage />

  return (
    <div className="App">
      {pageRender}
    </div>
  );

  //   const pageRender = userFromLocalStorage ?
  //   <Dashboard competitions={state.competitions} />
  //   :
  //   <HomePage />

  // return (
  //   <div className="App">
  //     {pageRender}
  //   </div>
  // );
}

export default App;

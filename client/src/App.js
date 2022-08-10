import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './stylesheet/App.scss';

import HomePage from './components/HomePage';
import Dashboard from './components/dashboard-core/DashboardMain';

function App() {

  const [state, setState] = useState({
    user: null,

    competitions: [],
    user_competitions_created: [],
    user_competitions_enrolled: [],

    competitions_created: {},

    competitions_enrolled: [],
    current_competition: {},
    transactions: [],
    user_balance: null
  });



  const userFromLocalStorage = localStorage.getItem("user");
  // console.log(userFromLocalStorage)
  const navigate = useNavigate();

  useEffect(() => {
    if (userFromLocalStorage) {
      //user authentication
      Promise.all([
        axios.get("/api/login", {
          headers: { 'Authorization': `Bearer ${userFromLocalStorage}` }
        })
      ]).then((userEmailID) => {
        //console.log ("emailID[0].data", userEmailID[0].data)

        // for now (user[0].data.user) gives email and ID in user variable
        // console.log (user[0].data)


        // calls for all comps, user transactions, user transactions

        Promise.all([
          axios.get("/api/competitions"),
          axios.get(`/api/user/${userEmailID[0].data.id}/competitions`),
          axios.post("/api/competitions/user_competitions", {
            data: { user: userEmailID[0].data, }
          }),

        ]).then((comps_userComps) => {

          Promise.all([
            axios.post("/api/charts/pie", {
              data: {
                user: userEmailID[0].data,
                user_competitions: {
                  id: comps_userComps[2].data[0].id, name: comps_userComps[2].data[0].name
                }
              }
            }),
            axios.post("/api/charts/portfolio", {
              data: {
                user: userEmailID[0].data,
                user_competitions: {
                  id: comps_userComps[2].data[0].id, name: comps_userComps[2].data[0].name
                }
              }
            })
          ]).then((transactions_userBalance) => {

            // console.log(transactions_userBalance[0].data)

            let current_comp_info = comps_userComps[2].data.length ? {
              id: comps_userComps[2].data[0].id, name: comps_userComps[2].data[0].name
            } : null

            setState(prev => ({
              ...prev,
              user: userEmailID[0].data,
              competitions: comps_userComps[0].data,
              user_competitions_created: comps_userComps[1].data.competitionsCreated,
              user_competitions_enrolled: comps_userComps[1].data.competitionsEnrolled,
              competitions_enrolled: comps_userComps[2].data,

              current_competition: current_comp_info,
              transactions: transactions_userBalance[0].data,    //specific to user and to competition
              user_balance: transactions_userBalance[1].data
            }));
          })





        })

      })

        .catch((e) => {
          console.log(e)
        })

    }
  }, []);

  const pageRender = state.user ?
    <Dashboard
      state={state}
      setState={setState}

      competitions={state.competitions}
      user_competitions_created={state.user_competitions_created}
      user_competitions_enrolled={state.user_competitions_enrolled}

      competitions_enrolled={state.competitions_enrolled}
      current_competition={state.current_competition}
      transactions={state.transactions_userBalance}

    />
    :
    <HomePage />

  return (
    <div className="App">
      {pageRender}
    </div>
  );
}

export default App;

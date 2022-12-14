import { useEffect, useState } from 'react';
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
    competitions_enrolled: [],
    current_competition: {},
    transactions: [],
    user_balance: null
  });

  const userFromLocalStorage = localStorage.getItem("user");

  useEffect(() => {
    if (userFromLocalStorage) {
      Promise.all([
        axios.get("/api/login", {
          headers: { 'Authorization': `Bearer ${userFromLocalStorage}` }
        })
      ]).then((userEmailID) => {
        Promise.all([
          axios.get("/api/competitions"),
          axios.get(`/api/user/${userEmailID[0].data.id}/competitions`),
          axios.post("/api/competitions/user_competitions", {
            data: { user: userEmailID[0].data, }
          }),
          axios.get(`/api/user/${userEmailID[0].data.id}`)
        ]).then((comps_userComps) => {
          let user_comp_info = null
          if (comps_userComps[2].data.length) {

            user_comp_info = {
              id: comps_userComps[2].data[0].id,
              name: comps_userComps[2].data[0].name,
              starting_amount: comps_userComps[2].data[0].starting_amount,
              start_date: comps_userComps[2].data[0].start_date,
              end_date: comps_userComps[2].data[0].end_date

            }
          }
          Promise.all([
            axios.post("/api/charts/pie", {
              data: {
                user: userEmailID[0].data,
                user_competitions: user_comp_info
              }
            }),
            axios.post("/api/charts/portfolio", {
              data: {
                user: userEmailID[0].data,
                user_competitions: user_comp_info
              }
            })
          ]).then((transactions_userBalance) => {
            let current_comp_info = null
            if (comps_userComps[2].data.length) {
              current_comp_info = {
                id: comps_userComps[2].data[0].id,
                name: comps_userComps[2].data[0].name,
                starting_amount: comps_userComps[2].data[0].starting_amount,
                start_date: comps_userComps[2].data[0].start_date,
                end_date: comps_userComps[2].data[0].end_date
              }
            }
            let user_balance_info = null
            if (transactions_userBalance[1].data) {
              user_balance_info = transactions_userBalance[1].data[0]
            }

            setState(prev => ({
              ...prev,
              user: userEmailID[0].data,
              user_profile: comps_userComps[3].data,
              competitions: comps_userComps[0].data,
              user_competitions_created: comps_userComps[1].data.competitionsCreated,
              user_competitions_enrolled: comps_userComps[1].data.competitionsEnrolled,
              competitions_enrolled: comps_userComps[2].data,
              current_competition: current_comp_info,
              transactions: transactions_userBalance[0].data || [],
              user_balance: user_balance_info
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
      transactions={state.transactions}
      user_balance={state.user_balance}
      user_profile={state.user_profile}
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
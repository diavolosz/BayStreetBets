import '../../stylesheet/Leaderboard.scss'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import React from 'react'
import axios from 'axios'

import LeaderboardItem from './LeaderboardItem'

export default function Leaderboard(props) {
  const [allUsers, setAllUsers] = useState([
    { email: 1, totalEquity: null },
    { email: 2, totalEquity: null },
    { email: 3, totalEquity: null }
  ]);

  useEffect(() => {
    let getUsers = []

    axios.post("/api/competitions/users_in_comp", {
      data: {
        user_competitions: props.current_competition
      }
    }).then(response => {
      let users = response.data

      if (users[0].final_equity !== null) {

        users.sort((b, a) => {
          return Number(a.final_equity.replace(/[^0-9.-]+/g, ""))
            -
            Number(b.final_equity.replace(/[^0-9.-]+/g, ""))
        })

        let list = users.slice(0, 4)
        setAllUsers(list)
      }

    })

  }, [props.current_competition])

  return (
    <div id="leaderboard-inner-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.4}
        numberOfPieces={70} />
      <h1>End of {props.current_competition.name}!</h1>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          <LeaderboardItem users={allUsers} />
        </tbody>
      </table>
    </div>
  )
}
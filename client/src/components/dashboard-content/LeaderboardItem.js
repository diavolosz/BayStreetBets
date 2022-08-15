import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

import { faCrown, faTrophy, faChampagneGlasses, faL } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function LeaderboardItem(props) {
  //console.log(props.users)

  let list;

  let position = ['Third', 'Second', 'First']

  if (props.users[0].totalEquity !== null) {

    list = props.users.map((user, index) => {
      return (

        <tr>
          <td><FontAwesomeIcon id="icon" icon={faCrown} /> {position[2 - index]} </td>
          <td>{user.email}</td>
        </tr>


      )
    })
  }



  return (

    list

  )
}


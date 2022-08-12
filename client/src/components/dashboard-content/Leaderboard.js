import '../../stylesheet/Leaderboard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faTrophy, faChampagneGlasses, faL } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import React from 'react'

export default function Leaderboard() {


  return (
    <div id="leaderboard-inner-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.4}
        numberOfPieces={70}
      />
      <h1>Bay Street's Winner</h1>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><FontAwesomeIcon id="icon" icon={faCrown} /> First</td>
            <td>User 1</td>
          </tr>
          <tr>
            <td><FontAwesomeIcon id="icon" icon={faTrophy} />Second</td>
            <td>User 2</td>
          </tr>
          <tr>
            <td><FontAwesomeIcon id="icon" icon={faChampagneGlasses} />Third</td>
            <td>User 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
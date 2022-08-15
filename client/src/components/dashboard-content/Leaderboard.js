import '../../stylesheet/Leaderboard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faTrophy, faChampagneGlasses, faL } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import React from 'react'
import axios from 'axios'
import { useResolvedPath } from 'react-router'

import LeaderboardItem from './LeaderboardItem'

export default function Leaderboard(props) {

  const [allUsers, setAllUsers] = useState([
    { email: 1, totalEquity: null },
    { email: 2, totalEquity: null },
    { email: 3, totalEquity: null }
  ])










  useEffect(() => {

    let getUsers = []


    Promise.all([



    ])



    //console.log (allUsers)


    axios.post("/api/competitions/users_in_comp", {
      data: {
        user_competitions: props.current_competition
      }
    }).then(response => {
      //console.log(response.data)

      let users = response.data







      users.forEach((user) => {

        axios.post("/api/competitions/leaderboard", {
          data: {
            user_id: user.user_id,
            comp_id: user.id
          }
        }).then(results => {
          //console.log("fromleaderboard",results.data)


          let userInfo = results.data[0]







          //console.log("usersinfo", userInfo)




          axios.post("/api/user/information", {
            data: {
              user_id: userInfo.user_id
            }
          }).then(reply => {

            //console.log ("getting name", reply.data[0])

            let userName = reply.data[0]







            getUsers.push({
              email: userName.email,
              final_equity: userInfo.final_equity


            })



            //console.log(allUsers[0])



            getUsers.sort((a, b) => {
              return Number(a.final_equity.replace(/[^0-9.-]+/g, "")) - Number(b.final_equity.replace(/[^0-9.-]+/g, ""))
            })

            setAllUsers(getUsers)





          })

          // .then(() => {

          //   //console.log(allUsers)
          //   //console.log('before', allUsers)



          //   //console.log ("before sort", allUsers)

          //   getUsers.sort((a, b) => {
          //     return Number(a.final_equity.replace(/[^0-9.-]+/g, "")) - Number(b.final_equity.replace(/[^0-9.-]+/g, ""))
          //   })

          //   // //console.log("after sort", getUsers)

          //   setAllUsers(getUsers)




          //   //console.log('after', allUsers)







          // })


        })






      })



      // console.log('before', allUsers)



      // //console.log ("before sort", allUsers)

      // getUsers.sort((a, b) => {
      //   return Number(a.final_equity.replace(/[^0-9.-]+/g, "")) - Number(b.final_equity.replace(/[^0-9.-]+/g, ""))
      // })

      // // //console.log("after sort", getUsers)

      // setAllUsers(getUsers)




      // //console.log('after', allUsers)



    })

  }, [props.current_competition])








  return (
    <div id="leaderboard-inner-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.4}
        numberOfPieces={70}
      />
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







    //<div id="leaderboard-inner-container">
    //<Confetti
    //  width={window.innerWidth}
    //  height={window.innerHeight}
    //  gravity={0.4}
    //  numberOfPieces={70}
    ///>
    //<h1>Bay Street's Winner</h1>
    //<table>
    //  <thead>
    //    <tr>
    //      <th>Placement</th>
    //      <th>User</th>
    //    </tr>
    //  </thead>
    //  <tbody>
    //    <tr>
    //      <td><FontAwesomeIcon id="icon" icon={faCrown} /> First</td>
    //      <td>User 1</td>
    //    </tr>
    //    <tr>
    //      <td><FontAwesomeIcon id="icon" icon={faTrophy} />Second</td>
    //      <td>User 2</td>
    //    </tr>
    //    <tr>
    //      <td><FontAwesomeIcon id="icon" icon={faChampagneGlasses} />Third</td>
    //      <td>User 3</td>
    //    </tr>
    //  </tbody>
    //</table>
    //</div>}










  )
}
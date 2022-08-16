import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LeaderboardItem(props) {
  let list;
  let position = ['Third', 'Second', 'First']

  if (props.users[0].totalEquity !== null) {
    list = props.users.map((user, index) => {

      return (
        <tr key={index}>
          <td><FontAwesomeIcon id="icon" icon={faCrown} /> {position[2 - index]} </td>
          <td>{user.email}</td>
        </tr>
      )
    })
  }

  return (list)
}
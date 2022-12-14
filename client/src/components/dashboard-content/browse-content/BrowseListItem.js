import axios from "axios";
import { useState } from "react"
import ErrorAlert from "../eventStatistic-content/ErrorAlert.js"
import {
  removeFromUserCompetitionCreated,
  removeFromCompetitions,
  addToCompetitionsEnrolled,
  removeFromCompetitionsEnrolled,
} from "../../../helpers/selectors";

export default function BrowseListItem(props) {

  const [displayAlert, setDisplayAlert] = useState(false);

  const deleteCompetition = () => {
    axios
      .delete("/api/competitions", {
        headers: {
          user: localStorage.getItem("user"),
        },
        data: {
          creatorId: props.user_id,
          competitionId: props.id,
        },
      })
      .then(response => {
        const updatedCompetitionsCreated = removeFromUserCompetitionCreated(
          props.state,
          props.id
        );
        const updatedCompetitions = removeFromCompetitions(
          props.state,
          props.id
        );

        if (response.status === 200) {
          props.setState(prev => ({
            ...prev,
            user_competitions_created: updatedCompetitionsCreated,
            competitions: updatedCompetitions,
          }));
        }
      });
  };

  const leaveCompetition = () => {
    const headers = {
      user: localStorage.getItem("user"),
    };

    axios
      .delete("/api/competitions/leave", {
        headers: {
          user: localStorage.getItem("user"),
        },
        data: {
          creatorId: props.user_id,
          competitionId: props.id,
        },
      })
      .then(response => {
        const updatedCompetitionsEnrolled = removeFromCompetitionsEnrolled(
          props.state,
          props.id
        );

        if (response.status === 200) {
          props.setState(prev => ({
            ...prev,
            user_competitions_enrolled: updatedCompetitionsEnrolled,
          }));
        }
      });
  };

  const joinCompetition = () => {
    const end_date = new Date(props.end_date).getTime();
    const current_date = Date.now();

    if (current_date > end_date) {
      return setDisplayAlert(true)
    } else {
      const headers = {
        user: localStorage.getItem("user"),
      };

      axios
        .post(
          "/api/competitions/join",
          {
            creatorId: props.user_id,
            competitionId: props.id,
            startingBalance: props.starting_amount,
          },
          {
            headers,
          }
        )
        .then(response => {
          const updatedCompetitionsEnrolled = addToCompetitionsEnrolled(
            props.state,
            response.data
          );

          if (response.status === 200) {
            props.setState(prev => ({
              ...prev,
              user_competitions_enrolled: updatedCompetitionsEnrolled,
            }));
          }
        });
      }
    };

  const renderDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
   };

  return (
    <div className="event-item">
      {displayAlert === true && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"Cannot join an expired event"} />}

      <div className="general-info-box">
        {/* <span><strong>Max Participant: </strong>{props.participant}</span> */}
        <span>
          <strong>Starting Amount: </strong>
          {props.starting_amount}
        </span>
        <span>
          <strong>Start Date: </strong>
          {renderDate(props.start_date)}
        </span>
        <span>
          <strong>End Date: </strong>
          {renderDate(props.end_date)}
        </span>
      </div>
      <div className="description-info-box">
        <span>
          <strong>Event Name: </strong>
          {props.name}
        </span>
        <span>
          <strong>Description: </strong>
          {props.description}
        </span>
        {props.deleteOption === true && (
          <button onClick={deleteCompetition}>CANCEL EVENT</button>
        )}
        {props.deleteOption === false && (
          <button onClick={leaveCompetition}>LEAVE EVENT</button>
        )}
        {props.deleteOption === null && (
          <button id="join-event" onClick={joinCompetition}>
            JOIN EVENT
          </button>
        )}
      </div>
    </div>
  );
}

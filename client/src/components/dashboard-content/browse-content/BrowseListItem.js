import axios from "axios";
import {
  removeFromUserCompetitionCreated,
  removeFromCompetitions,
  addToCompetitionsEnrolled,
  removeFromCompetitionsEnrolled,
} from "../../../helpers/selectors";

export default function BrowseListItem(props) {
  // const { index, user_id, name, description, starting_amount, created } = props

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
        //console.log(props.state.user_competitions_created);
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
  };

  const renderDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
   };

  return (
    <div className="event-item">
      <div className="general-info-box">
        <span>
          <strong>Creator: </strong>
          {props.user_id}
        </span>
        {/* <span><strong>Max Participant: </strong>{participant}</span> */}
        {/* <span><strong>Duration: </strong>{duration} Days</span> */}
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

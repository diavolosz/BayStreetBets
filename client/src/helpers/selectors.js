export const removeFromUserCompetitionCreated = (state, competitionId) => {
  let newCompetitionsCreated = [];

  state.user_competitions_created.forEach(competitionObj => {
    if (competitionObj.id !== competitionId) {
      newCompetitionsCreated.push({ ...competitionObj });
    }
    
  });

  return newCompetitionsCreated;
};

export const removeFromCompetitions = (state, competitionId) => {
  let newCompetitions = [];

  state.competitions.forEach(competitionObj => {
    if (competitionObj.id !== competitionId) {
      newCompetitions.push({ ...competitionObj });
    }
    
  });

  return newCompetitions;
};

export const addToUserCompetitionCreated = (state, competitionObj) => {
  let newCompetitionsCreated = [];

  state.user_competitions_created.forEach(competitionObj => {
    newCompetitionsCreated.push({ ...competitionObj });
  });

  newCompetitionsCreated.push(competitionObj);

  return newCompetitionsCreated;
};

export const addToCompetitions = (state, competitionObj) => {
  let newCompetitions = [];

  state.competitions.forEach(competitionObj => {
    newCompetitions.push({ ...competitionObj });
  });

  newCompetitions.push(competitionObj);

  return newCompetitions;
};
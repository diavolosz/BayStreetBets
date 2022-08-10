export const removeFromUserCompetitionCreated = (state, competitionId) => {
  let newCompetitionsCreated = [];

  state.user_competitions_created.forEach(competitionObj => {
    if (competitionObj.id !== competitionId) {
      newCompetitionsCreated.push({ ...competitionObj });
    }
    
  });

  return newCompetitionsCreated;
};

export const addToUserCompetitionCreated = (state, competitionObj) => {
  let newCompetitionsCreated = [];

  state.user_competitions_created.forEach(competitionObj => {
    newCompetitionsCreated.push({ ...competitionObj });
  });

  newCompetitionsCreated.push(competitionObj);

  return newCompetitionsCreated;
};
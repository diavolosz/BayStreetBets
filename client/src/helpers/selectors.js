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

export const addToCompetitionsEnrolled = (state, competitionObj) => {
  let newCompetitionsEnrolled = [];

  state.user_competitions_enrolled.forEach(competitionObj => {
    newCompetitionsEnrolled.push({ ...competitionObj });
  });

  newCompetitionsEnrolled.push(competitionObj);

  return newCompetitionsEnrolled;
};

export const removeFromCompetitionsEnrolled = (state, competitionId) => {
  let newCompetitionsEnrolled = [];

  state.user_competitions_enrolled.forEach(competitionObj => {
    if (competitionObj.id !== competitionId) {
      newCompetitionsEnrolled.push({ ...competitionObj });
    }
  });

  return newCompetitionsEnrolled;
};

export const getAllCompetitions = state => {
  const competitions = [];

  state.user_competitions_created.forEach(competitionObj => {
    competitions.push({ ...competitionObj });
  });
  state.user_competitions_enrolled.forEach(competitionObj => {
    competitions.push({ ...competitionObj });
  });

  return competitions;
};

export const deriveCashFromTransactions = (transactions, startingBalance) => {
  return transactions.reduce((total, value) => {
    return total - value.price * value.number_of_shares;
    // return total + value.price * value.number_of_shares;
  }, startingBalance);
};

export const getTransactionsForCompetition = (state, competitionId) => {
  return state.transactions.filter(competition => {
    return competition.competition_id === competitionId;
  });
};

export const updateTransactions = (state, transaction) => {
  const transactions = [];
  state.transactions.forEach(transaction => {
    transactions.push({ ...transaction });
  });

  transactions.push(transaction);
  return transactions;
};

export const getHolding = (transactions, symbol) => {
  return transactions.reduce((total, value) => {
    if (value.symbol === symbol) {
      return total + value.number_of_shares;
    }
    return total;
  }, 0);
};

-- schema/04_create_user_competitions.sql
DROP TABLE IF EXISTS user_competitions CASCADE;

-- CREATE user_competitions
CREATE TABLE user_competitions (
  id SERIAL PRIMARY KEY,
  user_balance MONEY NOT NULL,
  
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE
);
-- schema/02_create_competitions.sql
DROP TABLE IF EXISTS competitions CASCADE;
-- CREATE COMPETITIONS
CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starting_amount MONEY NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_date TIMESTAMP WITH TIME ZONE NOT NULL,

  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- TIMESTAMP WITH TIME ZONE will always take the local system time and convert to UTSC in database, when outputting it will convert to systems local time

-- example (  TIMESTAMP WITH TIME ZONE '2004-10-19 10:23:54+02'  )
-- schema/03_create_transactions.sql
DROP TABLE IF EXISTS transactions CASCADE;
DROP TYPE IF EXISTS buy_or_sell CASCADE;

-- CREATE ENUM for buy/sell
CREATE TYPE buy_or_sell AS ENUM ('Buy', 'Sell');

-- CREATE transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  buy_sell buy_or_sell,
  symbol VARCHAR (10) NOT NULL,
  price MONEY NOT NULL,
  number_of_shares INTEGER NOT NULL,
  transaction_date DATE NOT NULL,
  
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE
);

-- MONEY type can take 2 decimal points
-- DATE will come out as 'YYY-MM-DD'
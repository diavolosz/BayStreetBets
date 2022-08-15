-- seeds/03_transactions.sql
-- transactions seeds
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'AAPL', 100.00, 5, '2022-08-02 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'TSLA', 200.00, 5, '2022-08-03 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'META', 150.00, 10, '2022-08-04 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'NFLX', 125.00, 10, '2022-08-07 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Sell', 'META', 140.00, -10, '2022-08-09 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Sell', 'AAPL', 110.00, -5, '2022-08-10 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'AMD', 100.00, 10, '2022-08-10 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Sell', 'NFLX', 130.00, -5, '2022-08-12 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'AMZN', 200.00, 20, '2022-08-12 00:00:00-05', 2, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('Buy', 'EW', 300.00, 5, '2022-08-12 00:00:00-05', 2, 1);


-- seeds/03_transactions.sql
-- transactions seeds
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'AAPL', 100.00, 10, '2022-10-11 00:00:00-05', 1, 1);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'AAPL', 120.00, 5, '2022-10-12 00:00:00-05', 1, 1);

INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'AAPL', 100.00, 10, '2022-11-12 00:00:00-05', 2, 2);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'TWTR', 60.00, 5, '2022-11-13 00:00:00-05', 2, 2);

INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'AAPL', 100.00, 10, '2022-12-13 00:00:00-05', 3, 3);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'TWTR', 100.00, 10, '2022-12-14 00:00:00-05', 3, 3);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'AAPL', 120.00, 10, '2022-12-15 00:00:00-05', 3, 3);



INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'AAPL', 100.00, 10, '2022-09-11 00:00:00-05', 1, 4);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'TWTR', 100.00, 10, '2022-09-12 00:00:00-05', 1, 4);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'AAPL', 120.00, 3, '2022-09-13 00:00:00-05', 1, 4);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'TSLA', 100.00, 10, '2022-09-11 00:00:00-05', 2, 5);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'TSLA', 400.00, 20, '2022-09-12 00:00:00-05', 2, 5);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'TSLA', 120.00, 3, '2022-09-13 00:00:00-05', 2, 5);



INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'GOOGL', 100.00, 10, '2022-09-12 00:00:00-05', 1, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'GOOGL', 130.00, 8, '2022-09-13 00:00:00-05', 1, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'GOOGL', 140.00, 5, '2022-09-14 00:00:00-05', 1, 6);

INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'LCID', 100.00, 10, '2022-09-12 00:00:00-05', 2, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'LCID', 130.00, 10, '2022-09-14 00:00:00-05', 2, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'PTON', 140.00, 5, '2022-09-15 00:00:00-05', 2, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'PTON', 140.00, 8, '2022-09-15 00:00:00-05', 2, 6);

INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'META', 180.00, 10, '2022-09-12 00:00:00-05', 3, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'META', 170.00, 5, '2022-09-14 00:00:00-05', 3, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('sell', 'META', 140.00, 2, '2022-09-16 00:00:00-05', 3, 6);
INSERT INTO transactions (buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES ('buy', 'GME', 40.00, 50, '2022-09-16 00:00:00-05', 3, 6);
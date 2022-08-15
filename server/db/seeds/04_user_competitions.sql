-- seeds/user_competitions.sql
-- user_competitions seeds
INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (10000.00, 1, 2);
INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (20000.00, 2, 2);
INSERT INTO user_competitions (user_balance, final_equity, user_id, competition_id) VALUES (50000.00, 10000.00, 3, 3);
INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (50000.00, 1, 4);


INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (10000.00, 2, 1);
INSERT INTO user_competitions (user_balance, final_equity, user_id, competition_id) VALUES (50000.00, 20000.00, 2, 3);





UPDATE user_competitions SET user_balance = 9500.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 8500.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 6000.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 4750.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 6150.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 6700.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 5700.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 6350.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 2350.00 WHERE user_id = 2 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 1850.00 WHERE user_id = 2 AND competition_id = 1;


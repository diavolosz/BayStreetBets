-- seeds/user_competitions.sql
-- user_competitions seeds
INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (10000.00, 1, 1);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (20000.00, 2, 2);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (30000.00, 3, 3);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (40000.00, 1, 4);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (40000.00, 2, 5);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (40000.00, 1, 6);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (40000.00, 2, 7);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (40000.00, 3, 8);



INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (1000.00, 3, 9);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (5000.00, 3, 10);

INSERT INTO user_competitions (user_balance, user_id, competition_id) VALUES (3000.00, 3, 11);




-- UPDATING BALANCES FROM EACH TRANSACTION

UPDATE user_competitions SET user_balance = 9000.00 WHERE user_id = 1 AND competition_id = 1;
UPDATE user_competitions SET user_balance = 9600.00 WHERE user_id = 1 AND competition_id = 1;

UPDATE user_competitions SET user_balance = 19000.00 WHERE user_id = 2 AND competition_id = 2;
UPDATE user_competitions SET user_balance = 18700.00 WHERE user_id = 2 AND competition_id = 2;

UPDATE user_competitions SET user_balance = 29000.00 WHERE user_id = 3 AND competition_id = 3;
UPDATE user_competitions SET user_balance = 28000.00 WHERE user_id = 3 AND competition_id = 3;
UPDATE user_competitions SET user_balance = 29200.00 WHERE user_id = 3 AND competition_id = 3;



UPDATE user_competitions SET user_balance = 39000.00 WHERE user_id = 1 AND competition_id = 4;
UPDATE user_competitions SET user_balance = 38000.00 WHERE user_id = 1 AND competition_id = 4;
UPDATE user_competitions SET user_balance = 38360.00 WHERE user_id = 1 AND competition_id = 4;

UPDATE user_competitions SET user_balance = 39000.00 WHERE user_id = 2 AND competition_id = 5;
UPDATE user_competitions SET user_balance = 31000.00 WHERE user_id = 2 AND competition_id = 5;
UPDATE user_competitions SET user_balance = 31360.00 WHERE user_id = 2 AND competition_id = 5;



UPDATE user_competitions SET user_balance = 69000.00 WHERE user_id = 1 AND competition_id = 6;
UPDATE user_competitions SET user_balance = 67960.00 WHERE user_id = 1 AND competition_id = 6;
UPDATE user_competitions SET user_balance = 67260.00 WHERE user_id = 1 AND competition_id = 6;

UPDATE user_competitions SET user_balance = 69000.00 WHERE user_id = 2 AND competition_id = 7;
UPDATE user_competitions SET user_balance = 70300.00 WHERE user_id = 2 AND competition_id = 7;
UPDATE user_competitions SET user_balance = 69600.00 WHERE user_id = 2 AND competition_id = 7;
UPDATE user_competitions SET user_balance = 68480.00 WHERE user_id = 2 AND competition_id = 7;

UPDATE user_competitions SET user_balance = 68200.00 WHERE user_id = 3 AND competition_id = 8;
UPDATE user_competitions SET user_balance = 69050.00 WHERE user_id = 3 AND competition_id = 8;
UPDATE user_competitions SET user_balance = 68770.00 WHERE user_id = 3 AND competition_id = 8;
UPDATE user_competitions SET user_balance = 66770.00 WHERE user_id = 3 AND competition_id = 8;

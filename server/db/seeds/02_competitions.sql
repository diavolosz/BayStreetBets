-- seeds/02_competitions.sql
-- competitions seeds
INSERT INTO competitions (name, description, starting_amount, start_date, end_date, created_date, user_id) VALUES ('Tech stocks only', 'Three-week competition for trading tech stocks!', 10000.00, '2022-08-02 00:00:00-05', '2022-08-25 00:00:00-05', '2022-08-01 00:00:00-05', 1);

INSERT INTO competitions (name, description, starting_amount, start_date, end_date, created_date, user_id) VALUES ('ETFs!', 'Test your trading skills', 20000.00, '2022-11-11 00:00:00-05', '2022-11-18 00:00:00-05', '2022-08-02 00:00:00-05', 2);

INSERT INTO competitions (name, description, starting_amount, start_date, end_date, created_date, user_id) VALUES ('Value investing', 'Year-long investing competition', 50000.00, '2020-12-12 00:00:00-05', '2021-12-12 00:00:00-05', '2020-12-01 00:00:00-05', 3);

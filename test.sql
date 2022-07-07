\c nc_news_test;

BEGIN;
DELETE FROM comments WHERE comment_id = 10 RETURNING*;
ROLLBACK;


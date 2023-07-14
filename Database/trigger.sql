DROP TRIGGER IF EXISTS sync_seat;
DELIMITER $$
CREATE TRIGGER update_balance
AFTER INSERT ON movie_show
FOR EACH ROW
BEGIN
DECLARE v_no INT;
DECLARE v_count INT DEFAULT 1;
select SUM(silver_seat_qty + golden_seat_qty) INTO v_no from screen WHERE screenId=NEW.screenId;
WHILE v_count <= v_no Do
INSERT INTO bookingseat( seatNo , showId) VALUES(v_count, NEW.showId);
SET v_count = v_count + 1;
END WHILE;
END;
$$
DELIMITER ;
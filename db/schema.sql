DROP DATABASE IF EXISTS task_db;
CREATE DATABASE task_db;

CREATE TABLE tasks
(
    id INT NOT NULL AUTO_INCREMENT,
    header VARCHAR(100) NOT NULL,
    task VARCHAR(100),
    PRIMARY KEY(id)
)
SELECT * FROM tasks
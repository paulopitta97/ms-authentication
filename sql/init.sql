CREATE DATABASE 'ms-authentication';

CREATE TABLE IF NOT EXISTS application_user(
    id int(11) NOT NULL auto_increment PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO application_user (username, password) VALUES ('admin', 'teste');
#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USERNAME" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS project
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) NOT NULL,
        UNIQUE(name)
    );
    CREATE TABLE IF NOT EXISTS room
    (
        name VARCHAR(32) NOT NULL,
        project_name VARCHAR(32) NOT NULL,
        PRIMARY KEY (name, project_name),
        FOREIGN KEY (project_name) REFERENCES project(name)
    );
    CREATE TABLE IF NOT EXISTS device
    (
      deveui VARCHAR(32) PRIMARY KEY,
      name VARCHAR(32) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS room_project_device
    (
      room_name VARCHAR(32),
      project_name VARCHAR(32),
      deveui VARCHAR(32),
      PRIMARY KEY (room_name, project_name, deveui),
      FOREIGN KEY (room_name, project_name) REFERENCES room(name, project_name),
      FOREIGN KEY (deveui) REFERENCES device(deveui)
    );
    CREATE TABLE IF NOT EXISTS data
    (
      id SERIAL PRIMARY KEY,
      deveui VARCHAR(32) NOT NULL,
      ts timestamp with time zone NOT NULL,
      activity double precision,
      co2 double precision,
      humidity double precision,
      pressure double precision,
      temperature double precision,
      FOREIGN KEY (deveui) REFERENCES device(deveui)
    );
    CREATE TABLE IF NOT EXISTS battery
    (
        id SERIAL PRIMARY KEY,
        deveui VARCHAR(32) NOT NULL,
        ts timestamp with time zone NOT NULL,
        battery double precision,
        FOREIGN KEY (deveui) REFERENCES device(deveui)
    );
    CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        username VARCHAR(32) UNIQUE NOT NULL,
        email VARCHAR(252) UNIQUE NOT NULL,
        password VARCHAR(252) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS user_project
    (
      username VARCHAR(32),
      project_name VARCHAR(32),
      PRIMARY KEY (username, project_name),
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (project_name) REFERENCES project(name)
    );
    COMMIT;

    COPY project(name)
    FROM '/docker-entrypoint-initdb.d/projects.csv'
    DELIMITER ';'
    CSV HEADER;

    COPY room(name, project_name)
    FROM '/docker-entrypoint-initdb.d/rooms.csv'
    DELIMITER ';'
    CSV HEADER;

    COPY device(name, deveui)
    FROM '/docker-entrypoint-initdb.d/devices.csv'
    DELIMITER ';'
    CSV HEADER;

    COPY room_project_device(room_name, project_name, deveui)
    FROM '/docker-entrypoint-initdb.d/room_project_device.csv'
    DELIMITER ';'
    CSV HEADER;

    COPY users(username,email,password)
    FROM '/docker-entrypoint-initdb.d/users.csv'
    DELIMITER ';'
    CSV HEADER;

    COPY user_project(username, project_name)
    FROM '/docker-entrypoint-initdb.d/user_project.csv'
    DELIMITER ';'
    CSV HEADER;

    COMMIT;
EOSQL
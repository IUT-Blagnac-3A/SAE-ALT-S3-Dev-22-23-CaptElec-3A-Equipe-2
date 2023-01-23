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
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) NOT NULL,
        project_name VARCHAR(32) NOT NULL,
        FOREIGN KEY (project_name) REFERENCES project(name)
    );
    CREATE TABLE IF NOT EXISTS device
    (
      devEUI VARCHAR(32) PRIMARY KEY,
      device_name VARCHAR(32) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS room_device
    (
      room_id INTEGER,
      devEUI VARCHAR(32),
      PRIMARY KEY (room_id, devEUI),
      FOREIGN KEY (room_id) REFERENCES room(id),
      FOREIGN KEY (devEUI) REFERENCES device(devEUI)
    );
    CREATE TABLE IF NOT EXISTS data
    (
      id SERIAL PRIMARY KEY,
      devEUI VARCHAR(32) NOT NULL,
      ts timestamp with time zone NOT NULL,
      activity double precision,
      co2 double precision,
      humidity double precision,
      pressure double precision,
      temperature double precision,
      FOREIGN KEY (devEUI) REFERENCES device(devEUI)
    );
    CREATE TABLE IF NOT EXISTS battery
    (
        id SERIAL PRIMARY KEY,
        devEUI VARCHAR(32) NOT NULL,
        ts timestamp with time zone NOT NULL,
        battery double precision,
        FOREIGN KEY (devEUI) REFERENCES device(devEUI)
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
      user_id INTEGER,
      project_id INTEGER,
      PRIMARY KEY (user_id, project_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (project_id) REFERENCES project(id)
    );
    COMMIT;
EOSQL
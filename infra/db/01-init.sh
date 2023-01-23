#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USERNAME" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS project
    (
        name_project VARCHAR(32),
        PRIMARY KEY (name_project)
    );
    CREATE TABLE IF NOT EXISTS room
    (
        name_room VARCHAR(32),
        name_project VARCHAR(32),
        PRIMARY KEY (name_room),
        FOREIGN KEY (name_project) REFERENCES project(name_project)
    );
    CREATE TABLE IF NOT EXISTS device
    (
      name_device VARCHAR(32),
      name_room VARCHAR(32),
      ts timestamp with time zone NOT NULL,
      activity double precision,
      co2 double precision,
      humidity double precision,
      pressure double precision,
      temperature double precision,
      PRIMARY KEY (name_device),
      FOREIGN KEY (name_room) REFERENCES room(name_room)
    );
    CREATE TABLE IF NOT EXISTS battery
    (
        name_device VARCHAR(32),
        ts_ timestamp with time zone NOT NULL,
        battery double precision,
        PRIMARY KEY (name_device),
        FOREIGN KEY (name_device) REFERENCES device(name_device)
    );
    COMMIT;
EOSQL
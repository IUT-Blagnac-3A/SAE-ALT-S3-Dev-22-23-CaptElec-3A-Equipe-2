#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USERNAME" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS mqtt_data
    (
        deviceName VARCHAR(32),
        ts timestamp with time zone NOT NULL,
        activity double precision,
        co2 double precision,
        humidity double precision,
        pressure double precision,
        temperature double precision
    );
	CREATE TABLE IF NOT EXISTS room
    (
        projet VARCHAR(32),
        room VARCHAR(32),
        deviceName VARCHAR(32),
        ts TIMESTAMP WITH TIME zone NOT NULL,
        battery DOUBLE PRECISION
    );
    CREATE TABLE IF NOT EXISTS users
    (
        id character varying(32) COLLATE pg_catalog."default",
        username character varying(32) COLLATE pg_catalog."default",
        email character varying(252) COLLATE pg_catalog."default",
        password character varying(252) COLLATE pg_catalog."default"
    );
  COMMIT;
EOSQL
CREATE DATABASE my_database;

-- \c into my_database

CREATE TABLE chart(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    value NUMBER(255)
)
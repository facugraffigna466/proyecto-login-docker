CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', '1234')
    ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password) VALUES ('test', 'qwerty')
    ON CONFLICT (username) DO NOTHING;
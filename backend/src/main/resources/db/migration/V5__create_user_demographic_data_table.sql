CREATE TABLE IF NOT EXISTS user_demographic_data (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    sex INTEGER NOT NULL CHECK (sex IN (0, 1)),
    age REAL NOT NULL CHECK (age >= 0 AND age <= 200),
    weight REAL NOT NULL CHECK (weight >= 0),
    height REAL NOT NULL CHECK (height >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_diabetes_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE

);
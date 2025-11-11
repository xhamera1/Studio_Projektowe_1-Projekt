CREATE TABLE IF NOT EXISTS heart_attack_data
(
    id                     BIGSERIAL PRIMARY KEY,
    user_id                BIGINT    NOT NULL,
    age                    INTEGER   NOT NULL CHECK (age >= 0 AND age <= 200),
    sex                    INTEGER   NOT NULL CHECK (sex IN (0, 1)),
    cp                     INTEGER   NOT NULL CHECK (cp >= 1 AND cp <= 4),
    trestbps               INTEGER   NOT NULL CHECK (trestbps >= 0),
    chol                   INTEGER   NOT NULL CHECK (chol >= 0),
    thalach                INTEGER   NOT NULL CHECK (thalach >= 0),
    oldpeak                REAL      NOT NULL CHECK (oldpeak >= 0),
    exang                  INTEGER   NOT NULL CHECK (exang IN (0, 1)),
    prediction_probability REAL CHECK (prediction_probability >= 0 AND prediction_probability <= 100),
    llm_recommendation     TEXT,
    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_heart_attack_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

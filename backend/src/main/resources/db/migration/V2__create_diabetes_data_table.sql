CREATE TABLE  IF NOT EXISTS diabetes_data (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    hba1c_level REAL NOT NULL,
    blood_glucose_level INTEGER NOT NULL,
    bmi REAL NOT NULL CHECK (bmi >= 0 AND bmi <= 100),
    age REAL NOT NULL CHECK (age >= 0 AND age <= 200),
    smoking_history INTEGER NOT NULL CHECK (smoking_history >= 0),
    prediction_result BOOLEAN,
    prediction_probability REAL CHECK (prediction_probability >= 0 AND prediction_probability <= 100),
    model_version VARCHAR(255),
    llm_recommendation TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_diabetes_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);
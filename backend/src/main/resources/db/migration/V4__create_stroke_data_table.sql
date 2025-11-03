CREATE TABLE  IF NOT EXISTS stroke_data (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 200),
    sex INTEGER NOT NULL CHECK (sex IN (0, 1)),
    hypertension INTEGER NOT NULL CHECK (hypertension IN (0, 1)),
    heart_disease INTEGER NOT NULL CHECK (heart_disease IN (0, 1)),
    work_type INTEGER NOT NULL CHECK (work_type >= 0),
    avg_glucose_level REAL NOT NULL CHECK (avg_glucose_level >= 0),
    bmi REAL NOT NULL CHECK (bmi >= 0 AND bmi <= 100),
    prediction_result BOOLEAN,
    prediction_probability REAL CHECK (prediction_probability >= 0 AND prediction_probability <= 100),
    model_version VARCHAR(255),
    llm_recommendation TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_stroke_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE

);

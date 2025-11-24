CREATE TABLE IF NOT EXISTS habit_assessments
(
    id                       BIGSERIAL PRIMARY KEY,
    user_id                  BIGINT    NOT NULL,
    water_intake_glasses     INTEGER   NOT NULL CHECK (water_intake_glasses >= 0),
    sleep_hours              REAL      NOT NULL CHECK (sleep_hours >= 0 AND sleep_hours <= 24),
    steps_per_day            INTEGER   NOT NULL CHECK (steps_per_day >= 0),
    exercise_minutes         INTEGER   NOT NULL CHECK (exercise_minutes >= 0),
    screen_time_hours        REAL      NOT NULL CHECK (screen_time_hours >= 0 AND screen_time_hours <= 24),
    stress_level             INTEGER   NOT NULL CHECK (stress_level BETWEEN 1 AND 5),
    fruits_veggies_servings  INTEGER   NOT NULL CHECK (fruits_veggies_servings >= 0),
    wellness_score           REAL      NOT NULL CHECK (wellness_score >= 0 AND wellness_score <= 100),
    llm_recommendation       TEXT,
    created_at               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_habit_assessments_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);


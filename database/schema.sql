CREATE TYPE gender_type AS ENUM ('male', 'female');

CREATE TABLE children (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender gender_type NOT NULL,
    notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE servants (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  joined_at DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE classes (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  teacher_id BIGINT REFERENCES servants(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
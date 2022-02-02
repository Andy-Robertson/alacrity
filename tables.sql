DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS sub_task CASCADE;

CREATE TABLE users (
  id                SERIAL PRIMARY KEY,
  auth_id           VARCHAR(30) NOT NULL,
  provider_name     VARCHAR(30) NOT NULL,
  display_name      VARCHAR(30) NOT NULL,
  first_name        VARCHAR(30),
  last_name         VARCHAR(30),
  email             VARCHAR(120),
  avatar            VARCHAR(250) NOT NULL,
  marketing         BOOLEAN NOT null,
  pom_minutes 		  VARCHAR(2),
  pom_seconds		    VARCHAR(2)
);

CREATE TABLE task (
  id                    SERIAL PRIMARY KEY,
  user_id               INTEGER NOT NULL,
  task_archived			    BOOLEAN NOT NULL,
  task_subject          TEXT NOT NULL,
  subject_description   TEXT,
  reward                TEXT,
  resources             TEXT,
  by_time               TIME NOT NULL,
  by_date               DATE NOT NULL,
  sub_task_option       BOOLEAN NOT NULL,
  sub_tasks             TEXT [],
  FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT check_sub_task_option 
  CHECK ( (sub_task_option = true AND sub_tasks IS NOT NULL) OR (sub_task_option = false AND sub_tasks IS NULL))
  -- task_added            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sub_task (
  id                    SERIAL PRIMARY KEY,
  user_id               INTEGER NOT NULL,
  task_id               INTEGER NOT NULL,
  name                  TEXT,
  FOREIGN KEY (task_id) REFERENCES task(id)
);
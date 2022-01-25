DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS task CASCADE;

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

INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('103930551192292680756', 'google', 'JohnM', 'John', 'Meric', 'john@gmail.com', 'http://tempavatar.com/pic1', true);
INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('1034405', 'github', 'JamesD', 'James', 'Dean','james@gmail.com', 'http://tempavatar.com/pic2', true);
INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('103330541192242680756', 'google', 'PaulB', 'Paul', 'Black', 'paul@gmail.com', 'http://tempavatar.com/pic3', false);
INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('1039905', 'github', 'GavinD', 'Gavin', 'Drew','Gavin@gmail.com', 'http://tempavatar.com/pic4', true);
INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('103330551992242680756', 'google', 'MarkS', 'Mark', 'Stango', 'mark@gmail.com', 'http://tempavatar.com/pic5', false);
INSERT INTO users (auth_id, provider_name, display_name, first_name, last_name, email, avatar, marketing) VALUES ('1022305', 'github', 'AlexD', 'Alex', 'Dent', 'Alex@gmail.com', 'http://tempavatar.com//pic6', true);

INSERT INTO task (user_id, task_archived, task_subject, subject_description, by_time, by_date, sub_task_option) VALUES (1, false, 'Python', 'fun fun fun!', '14:00', '01/08/2022', false);
INSERT INTO task (user_id, task_archived, task_subject, subject_description, sub_task_option, by_time, by_date) VALUES (2, false, 'Renew Gym sub', 'Pay 15£ htmlFor the gym', false, '14:00', '01/08/2022');
INSERT INTO task (user_id, task_archived, task_subject, subject_description, sub_task_option, by_time, by_date) VALUES (2, true, 'Renew Netflix sub', 'Pay 20£', false, '10:00', '01/08/2022');
INSERT INTO task (user_id, task_archived, task_subject, subject_description, sub_task_option, by_time, by_date, reward, resources, sub_tasks) VALUES (2, false, 'Finish CYF week 1 HW', '', true, '14:00', '01/09/2022','Go to the beatch', 'http://nice-resource.com', '{"Freecode camp JS course", "Khan academy JS course", "CYF JS course work"}');

INSERT INTO task (user_id, task_archived, task_subject, subject_description, sub_task_option, by_time, by_date) VALUES (2, true, 'Renew Gym sub', 'Pay 15£ htmlFor the gym', false, '14:00', '01/10/2022');
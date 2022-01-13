const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "alacritydb",
  password: "Abdulrahman123",
  port: 5432,
});

const app = express();
const PORT = parseInt(process.env.PORT || "5000");

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  console.log(
    "Method: " + req.method + "," + "Path: " + req.path + "," + "IP: " + req.ip
  );
  next();
});

// Data from database
//title/subject_name,desc/subject_comment from subjects table,
//time/complete_by  from schedules

app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM task WHERE user_id = $1", [2])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((e) => console.error(e));
});

app.post("/", (req, res) => {
  const user_id = 2;
  const task_subject = req.body.task_subject;
  const subject_description = req.body.subject_description;
  const sub_task_option = req.body.sub_task_option;
  const sub_tasks = req.body.sub_tasks;
  const reward = req.body.reward;
  const resources = req.body.resources;
  const by_time = req.body.by_time;
  const by_day = req.body.by_day;
  console.log(req.body)
  pool
    .query("SELECT * FROM task WHERE user_id = $1", [user_id])
    .then((result) => {
      const query =
        "INSERT INTO task (user_id, task_subject, subject_description, reward, resources, by_time, by_date, sub_task_option, sub_tasks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        pool
          .query(query, [
            user_id,
            task_subject,
            subject_description,
            reward,
            resources,
            by_time,
            by_day,
            sub_task_option,
            sub_tasks,
          ])
          .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
});

app.listen(PORT, () =>
  console.log(`Alacrity server now gravitating on http://localhost:${PORT}`)
);

const pool = require("../data/postgresConfig");
require("../server");

// Route the app.
const router = (app) => {
  // Root welcome message.
  app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Alacrity API!",
    });
  });

  // Load tasks (users.auth_id).
  app.get("/api/tasks", (req, res) => {
    // console.log(req.session.passport.user);
    pool
      .query("SELECT * FROM task WHERE user_id = $1", [2])
      .then((result) => {
        res.status(200).json(result.rows);
      })
      .catch((e) => console.error(e));
  });

  // Add user tasks (users.auth_id).
  app.post("/api/tasks", (req, res) => {
    // console.log(req.session.passport.user);

    const user_id = 2;
    const task_subject = req.body.task_subject;
    const subject_description = req.body.subject_description;
    const sub_task_option = req.body.sub_task_option;
    const sub_tasks = req.body.sub_tasks;
    const reward = req.body.reward;
    const resources = req.body.resources;
    const by_time = req.body.by_time;
    const by_day = req.body.by_day;

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

  // Error handling
  app.use((req, res) => {
    res.status(404).json({
      message: "Route Not Found",
    });
  });
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
};

module.exports = router;

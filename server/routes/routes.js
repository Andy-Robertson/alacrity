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
    const auth_id = req.session.passport.user; 
  pool
    .query("SELECT * FROM users WHERE auth_id = $1", [auth_id])
    .then((result) => {
      const user_id = result.rows[0].id;
      // console.log(user_id)
      pool
        .query("SELECT * FROM task WHERE user_id = $1", [user_id])
        .then((result) => {
          // console.log(result.rows);
          res.status(200).json(result.rows);
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  });

  // Add user tasks (users.auth_id).
  app.post("/api/tasks", (req, res) => {
    // console.log(req.session.passport.user);
const auth_id = req.session.passport.user;
const task_subject = req.body.task_subject;
const subject_description = req.body.subject_description;
const reward = req.body.reward;
const resources = req.body.resources;
const by_time = req.body.by_time;
const by_date = req.body.by_date;
const sub_task_option = req.body.sub_task_option;
const sub_tasks = req.body.sub_tasks;
// console.log(req.body);
pool
  .query("SELECT * FROM users WHERE auth_id = $1", [auth_id])
  .then((result) => {
    const user_id = result.rows[0].id;
    // console.log(user_id);
    pool
      .query("SELECT * FROM task WHERE user_id = $1", [user_id])
      .then(() => {
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
            by_date,
            sub_task_option,
            sub_tasks,
          ])
          .then((result) => {
            res.status(204);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));
  });

  // Edit user tasks 
  app.put("/api/tasks", (req, res) => {
    // console.log(req.session.passport.user);
    console.log(req.body);
    const subject_id = req.body.id;
    const task_subject = req.body.task_subject;
    const subject_description = req.body.subject_description;
    const reward = req.body.reward;
    const resources = req.body.resources;
    const by_time = req.body.by_time;
    const by_date = req.body.by_date;
    const sub_task_option = req.body.sub_task_option;
    const sub_tasks = req.body.sub_tasks;
    const query =
      "UPDATE task SET task_subject = $1, subject_description = $2, reward = $3, resources= $4, by_time = $5, by_date = $6, sub_task_option = $7, sub_tasks = $8 WHERE id = $9;";
      pool
        .query(query, [
          task_subject,
          subject_description,
          reward,
          resources,
          by_time,
          by_date,
          sub_task_option,
          sub_tasks,
          subject_id,
        ])
        .then((result) => {
          res.status(204);
        })
        .catch((e) => console.error(e));;
  });

  // Catch all - non matching routes sent back to index.html (keep below all other routes and above err handling).
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  // });

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

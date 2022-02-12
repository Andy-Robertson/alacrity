const pool = require("../data/postgresConfig");
require("../server");

//     ---------- QUERY STRING CONSTRAINTS ----------     //

const FIND_USER_BY_ID = "SELECT * FROM users WHERE auth_id = $1";

const UPDATE_USER_SETTINGS = `
  UPDATE
    users
  SET
    pom_minutes = $1,
    pom_seconds = $2,
    notifications_sound_active = $3,
    notifications_active = $4
  WHERE
    auth_id = $5`;

//     -------------- ROUTER FUNCTION --------------     //

// App router.
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
        pool
          .query("SELECT * FROM task WHERE user_id = $1", [user_id])
          .then((result) => {
            const queryPromises = [];
            result.rows.forEach((row) => {
              const queryPromise = pool
                .query("SELECT * FROM sub_task WHERE task_id = $1", [row.id])
                .then((subTaskResult) => {
                  row.sub_tasks = subTaskResult.rows;
                })
                .catch((e) => console.error(e));
              queryPromises.push(queryPromise);
            });
            Promise.all(queryPromises)
              .then(() => {
                res.status(200).json(result.rows);
              })
              .catch((e) => console.error(e));
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  });

  // Add user tasks (users.auth_id).
  app.post("/api/tasks", (req, res) => {
    const auth_id = req.session.passport.user;
    const task_archived = false;
    const {
      task_subject,
      subject_description,
      sub_task_option,
      sub_tasks,
      reward,
      resources,
      by_time,
      by_date,
    } = req.body;

    pool
      .query("SELECT * FROM users WHERE auth_id = $1", [auth_id])
      .then((result) => {
        const user_id = result.rows[0].id;

        const query =
          "INSERT INTO task (user_id, task_archived, task_subject, subject_description, reward, resources, by_time, by_date, sub_task_option) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
        pool
          .query(query, [
            user_id,
            task_archived,
            task_subject,
            subject_description,
            reward,
            resources,
            by_time,
            by_date,
            sub_task_option,
          ])
          .then((taskInsertResult) => {
            const task_id = taskInsertResult.rows[0].id;
            if (sub_task_option) {
              const queryPromises = [];
              sub_tasks.forEach((sub_task) => {
                const queryPromise = pool.query(
                  "INSERT INTO sub_task (index, name, completed, task_id) VALUES ($1,$2,$3,$4)",
                  [sub_task.index, sub_task.name, sub_task.completed, task_id]
                );
                queryPromises.push(queryPromise);
              });
              Promise.all(queryPromises)
                .then(() => {
                  res.sendStatus(204);
                })
                .catch((e) => console.error(e));
            } else {
              res.sendStatus(204);
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  });

  // Edit user tasks
  app.put("/api/tasks", (req, res) => {
    const {
      task_id,
      task_subject,
      subject_description,
      sub_task_option,
      sub_tasks,
      reward,
      resources,
      by_time,
      by_date,
    } = req.body;
    // console.log(sub_tasks);
    const query =
      "UPDATE task SET task_subject = $1, subject_description = $2, reward = $3, resources= $4, by_time = $5, by_date = $6, sub_task_option = $7 WHERE id = $8;";
    pool
      .query(query, [
        task_subject,
        subject_description,
        reward,
        resources,
        by_time,
        by_date,
        sub_task_option,
        task_id,
      ])
      .then(() => {
        if (sub_tasks) {
          const queryPromises = [];
          // console.log(sub_tasks);
          sub_tasks.forEach((sub_task) => {
            const queryPromise = pool
              .query("SELECT * FROM sub_task WHERE id=$1", [sub_task.id])
              .then((result) => {
                if (result.rows.length !== 0) {
                  pool.query(
                    "UPDATE sub_task SET name = $1, index=$2, completed=$3 WHERE id=$4",
                    [
                      sub_task.name,
                      sub_task.index,
                      sub_task.completed,
                      sub_task.id,
                    ]
                  );
                } else {
                  pool.query(
                    "INSERT INTO sub_task ( name, index, completed, task_id) VALUES ($1,$2,$3, $4)",
                    [sub_task.name, sub_task.index, sub_task.completed, task_id]
                  );
                }
              })
              .catch((e) => console.error(e));
            queryPromises.push(queryPromise);
          });
          Promise.all(queryPromises).then(() => res.sendStatus(201));
        } else {
          res.sendStatus(204);
        }
      })
      .catch((e) => console.error(e));
  });

  // DELETE SUB TASK
  app.delete("/api/tasks", (req, res) => {
    console.log(req.body);
    const ids = req.body["id"];
    console.log(ids);

    if (ids) {
      const queryPromises = [];
      ids.forEach((id) => {
        if (id) {
          const queryPromise = pool.query("DELETE FROM sub_task WHERE id=$1", [
            id,
          ]);
          queryPromises.push(queryPromise);
        } else {
          return;
        }
      });
      Promise.all(queryPromises).then(() => res.sendStatus(200));
    } else {
      res.sendStatus(204);
    }
  });

  app.put("/api/tasks/archived", (req, res) => {
    const { task_id, task_archived } = req.body;

    const query = "UPDATE task SET task_archived= $1 WHERE id= $2;";

    pool
      .query(query, [task_archived, task_id])
      .then((result) => {
        result.rows
          ? res.status(200).json({
              Result: "Success",
              message: "Request complete: task archive status updated",
            })
          : res
              .status(500)
              .json({ Result: "Failure", message: "Request not complete" });
      })
      .catch((e) => console.error(e));
  });

  // Load user settings.
  app.get("/api/settings", (req, res) => {
    const auth_id = req.session.passport.user;

    pool
      .query(FIND_USER_BY_ID, [auth_id])
      .then((result) => {
        result.rows
          ? res.status(200).json({
              pom_minutes: result.rows[0].pom_minutes,
              pom_seconds: result.rows[0].pom_seconds,
              notifications_sound_active:
                result.rows[0].notifications_sound_active,
              notifications_active: result.rows[0].notifications_active,
            })
          : res
              .status(500)
              .json({ Result: "Failure", message: "Request not complete" });
      })
      .catch((e) => console.error(e));
  });

  // Update user settings.
  app.put("/api/settings", (req, res) => {
    const auth_id = req.session.passport.user;
    const {
      pom_minutes,
      pom_seconds,
      notifications_sound_active,
      notifications_active,
    } = req.body;

    pool
      .query(UPDATE_USER_SETTINGS, [
        pom_minutes,
        pom_seconds,
        notifications_sound_active,
        notifications_active,
        auth_id,
      ])
      .then((result) => {
        result.rowCount > 0
          ? res
              .status(200)
              .json({ Result: "Success", message: "Settings updated" })
          : res
              .status(500)
              .json({ Result: "Failure", message: "Request not complete" });
      })
      .catch((e) => console.error(e));
  });

  // tick system sub task
  app.put("/api/task/status", (req, res) => {
    const { id, completed } = req.body;
    pool
      .query("UPDATE sub_task SET completed = $1 WHERE id = $2;", [
        completed,
        id,
      ])
      .then(() => {
        res.sendStatus(201);
      })
      .catch((e) => console.error(e));
  });

  // Analytics
  app.get("/api/tasks/analytics", (req, res) => {
    const auth_id = req.session.passport.user;

    // Getting user Id
    pool
      .query(FIND_USER_BY_ID, [auth_id])
      .then((result) => {
        const user_id = result.rows[0].id;
        pool
          .query("SELECT * FROM analytics WHERE user_id = $1", [user_id])
          .then((analyticsDataResult) => {
            res.status(200).json(analyticsDataResult.rows);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));


        //     // remove duplicate object from completedTasksArray
        //     const uniqueCompletedTasksArray = Array.from(
        //       new Set(completedTasksArray.map((task) => task.id))
        //     ).map((id) => {
        //       return completedTasksArray.find((task) => task.id === id);
  });

  app.post("/api/tasks/analytics", (req, res) => {
    const { user_id, task_id, task_archived, by_date, is_completed } = req.body;

    if (task_archived) {
      pool
        .query("SELECT * FROM analytics WHERE task_id = $1", [task_id])
        .then((result) => {
          if (result.rows.length === 0) {
            pool
              .query(
                "INSERT INTO analytics (task_id, task_archived, by_date, is_completed, user_id) VALUES ($1, $2, $3, $4, $5)",
                [task_id, task_archived, by_date, is_completed, user_id]
              )
              .then(() => res.sendStatus(201))
              .catch((e) => console.error(e));
          } else {
            res.sendStatus(204);
          }
        })
        .catch((e) => console.error(e));
    } else {
      pool
        .query("DELETE FROM analytics WHERE task_id = $1", [task_id])
        .then(() => res.sendStatus(200))
        .catch((e) => console.error(e));
    }
  });

  app.put("/api/tasks/analytics", (req, res) => {
    const { task_id, is_completed } = req.body;
    pool
      .query("UPDATE analytics SET is_completed = $1 WHERE task_id = $2", [
        is_completed,
        task_id,
      ])
      .then(() => res.sendStatus(201))
      .catch((e) => console.error(e));
  });

  app.get("*", (req, res) => {
    res.redirect("https://alacrity-focus.herokuapp.com");
  });

  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
};

module.exports = router;

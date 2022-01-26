const pool = require("../data/postgresConfig");
require("../server");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

//     ---------- QUERY STRING CONSTRAINTS ----------     //

const FIND_USER_BY_ID = "SELECT * FROM users WHERE auth_id = $1";

const UPDATE_USER_SETTINGS = `
  UPDATE
    users
  SET
    pom_minutes = $1,
    pom_seconds = $2
  WHERE
    auth_id = $3`;

//     -------------- Email For all user --------------     //
// email transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "procrastinationkill@gmail.com",
    // a challenge: how to get auth from gmail to let node.js sending the email
    // solution: go to manage your google account => security => Signing in to Google => app password => create an email password
    pass: "mpbrqwomztcklvck",
  },
});
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// Variables
const quotes = require("../motivational-quotes.json");
const letter = pickFromArray(quotes);

pool.query("SELECT * From users").then((result) => {
  // console.log(result.rows);
  const allUsers = result.rows;
  allUsers.forEach((user) => {
    const firstName = user.first_name;
    const lastName = user.last_name;
    const email = user.email;

    const text = `
    Hi ${firstName} ${lastName}, Good morning,

    I hope this finds you well,

    Do not forget to check alacrity website to see the tasks you have to do it today,

    As ${letter.author} said: ${letter.quote},

    All the best.
    `;

    const mailOptions = {
      from: "procrastinationkill@gmail.com",
      to: email,
      subject: "Test : Kil procrastination",
      text: text,
    };
    // send email
    // a challenge: how to make the email sending depends on time
    // solution: using a cron library
    cron.schedule("00 08 * * *", () => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email send: " + info.response);
        }
      });
    });
  })
})
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
      by_date
    } = req.body;

    pool
      .query("SELECT * FROM users WHERE auth_id = $1", [auth_id])
      .then((result) => {
        const user_id = result.rows[0].id;

        pool
          .query("SELECT * FROM task WHERE user_id = $1", [user_id])
          .then(() => {
            const query =
              "INSERT INTO task (user_id, task_archived, task_subject, subject_description, reward, resources, by_time, by_date, sub_task_option, sub_tasks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
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
                sub_tasks,
              ])
              .then(() => {
                res.sendStatus(204);
              })
              .catch((e) => console.error(e));
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  });

  // Edit user tasks
  app.put("/api/tasks", (req, res) => {
    const {
      subject_id,
      task_subject,
      subject_description,
      sub_task_option,
      sub_tasks,
      reward,
      resources,
      by_time,
      by_date,
    } = req.body;
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
        res.sendStatus(201);
      })
      .catch((e) => console.error(e));
  });

  app.put("/api/tasks/archived", (req, res) => {
    const { task_id, task_archived } = req.body;

    const query = "UPDATE task SET task_archived= $1 WHERE id= $2;";

    pool
      .query(query, [task_archived, task_id])
      .then((result) => {
        result.rows ?
           res.status(200).json({
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
    const { pom_minutes, pom_seconds } = req.body;

    pool
      .query(UPDATE_USER_SETTINGS, [pom_minutes, pom_seconds, auth_id])
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

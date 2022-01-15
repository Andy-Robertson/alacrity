// Set server address, port and required packages.
const PORT = parseInt(process.env.PORT || "5000");
const path = require("path");
const Keygrip = require("keygrip");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
const express = require("express");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
require("./authentication/passportConfig");
require("./data/postgresConfig");

const app = express();
const PORT = parseInt(process.env.PORT || "5000");

// Data from database
//title/subject_name,desc/subject_comment from subjects table,
//time/complete_by  from schedules
// Enable trust proxy required due to X-forward headers during authentication.
if (process.env.WORKING_ENVIRONMENT === "production") app.enable("trust proxy");

// Production / Development environment selection.
const CLIENT_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-focus.herokuapp.com"
    : "http://localhost:3000"
);

// Serve client files from the build folder.
app.use(express.static(path.join(__dirname, "../client/build")));

// Configure session cookies with 24hr expiration and random keys.
app.use(
  cookieSession({
    name: "session",
    keys: new Keygrip(["key1", "key2"], "SHA384"),
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

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
    .catch((e) => console.error(e))});
// Start alacrity server
const server = app.listen(PORT, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(`Alacrity server is now gravitating on Port: ${PORT}`);
});
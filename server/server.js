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

app.get("/", (req,res) => {
  pool
  .query("SELECT * FROM task WHERE user_id = $1", [2])
  .then((result) => {
    // console.log(result.rows)
    // const taskArray = result.rows;
    // let index = taskArray.findIndex(element => element.sub_task_option == true)
    // console.log(index); 
    res.status(200).json(result.rows)
  })
  .catch(e => console.error(e))
})


app.listen(PORT, () =>
  console.log(`Alacrity server now gravitating on http://localhost:${PORT}`)
);

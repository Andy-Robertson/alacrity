const pool = require("./data/postgresConfig");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const quotes = require("./motivational-quotes.json");


const configureEmails = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  function pickFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // Variables
  const letter = pickFromArray(quotes);

  pool.query("SELECT * From users").then((result) => {
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
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Test : Kil procrastination",
        text: text,
      };
      cron.schedule("00 08 * * *", () => {
        transporter.sendMail(mailOptions, (error) => error && console(error));
      });
    });
  });
};
module.exports = configureEmails;

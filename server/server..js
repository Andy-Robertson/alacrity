const PORT = parseInt(process.env.PORT || "5000");
const express = require("express");

const app = express();

app.listen(PORT, () =>
  console.log(`Alacrity server now gravitating on http://localhost:${PORT}`)
);
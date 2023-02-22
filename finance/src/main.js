const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../src/routes");

const app = express();
const port = process.env.PORT || 3004;

routes(app);

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

module.exports = app;

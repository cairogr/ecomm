const express = require("express");
const bodyParser = require("body-parser");
const routes = require ('../api/routes')

const app = express();
const port = process.env.PORT || 3000;


routes(app)
// app.use(bodyParser.json());

// app.get("/test", (req, res) =>
//   res.status(200).send({ mensagem: "boas vindas à API" })
// );



app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

module.exports = app;

const express = require("express");
const routes = require("../src/routes");

const app = express();
console.log("Init Service Orders");

const port = process.env.PORT || 3005;
app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
routes(app);

module.exports = app;

const bodyParser = require("body-parser");
const orders = require("./ordersRoute.js");

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(orders);
};

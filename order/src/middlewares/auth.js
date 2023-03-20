const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bearerStrategy = new BearerStrategy(async (token, done) => {
	try {
		const valido = jwt.verify(token, process.env.APP_SECRET);

		done(null, valido, { token: token });
	} catch (erro) {
		done(erro);
	}      
}
);

passport.use(bearerStrategy);

const authBearer = passport.authenticate("bearer", { session: false });

module.exports = authBearer;

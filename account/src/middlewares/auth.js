import passport from "passport";
import { Strategy as BearerStrategy} from "passport-http-bearer";
import { Strategy as LocalStrategy } from "passport-local";
import Users from "../models/accounts.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findTokenBlockList } from "../../redis/configServerRedis.js";

const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
		session: false,
	},
	async (email, password, done) => {
		try {
			const user = await Users.findOne({ email: email});
			if (!user) {
				return done(null, false, {
					message: `Cannot find contact with email=${email}.`,
				});
			}

			const passwordValid = await bcrypt.compare(password, user.password);

			if (!passwordValid) {
				return done(null, false, { message: "Invalid password" });
			}
			return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	}
);

const bearerStrategy = new BearerStrategy(async (token, done) => {
	try {
		findTokenBlockList(token);
		const payload = jwt.verify(token, process.env.APP_SECRET);
		const usuario = await Users.findById(payload.id);
		console.log(payload.id);
		done(null, usuario, token);
	} catch (erro) {
		done(erro);
	}      
}
);

passport.use(localStrategy);
passport.use(bearerStrategy);

export const authLocal =  (req, res, next) => {
	passport.authenticate(
		"local",
		{ session: false },
		(erro, usuario, info) => {
			if (!usuario) {
				return res.status(401).json({ info });
			}
			req.user = usuario;
			return next();
		}
	)(req, res, next);
};
export const authBearer = passport.authenticate("bearer", { session: false });

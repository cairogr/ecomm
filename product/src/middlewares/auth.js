import passport from "passport";
import { Strategy as BearerStrategy} from "passport-http-bearer";
import jwt from "jsonwebtoken";

const bearerStrategy = new BearerStrategy(async (token, done) => {
	try {
		const payload = jwt.verify(token, process.env.APP_SECRET);
		done(null, payload, { token: token });
	} catch (erro) {
		done(erro);
	}      
}
);

passport.use(bearerStrategy);

export const authBearer = passport.authenticate("bearer", { session: false });

import * as passport from "passport";

export default (function (this: passport.Authenticator) {
	return this;
}.call(new passport.Authenticator()));

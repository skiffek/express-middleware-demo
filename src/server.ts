import type * as http from "http";

import app from "./app";
import config from "./config";

export default (function () {
	const server = app.listen(config.port, function (this: http.Server) {
		console.log("Listening for HTTP on %j", this.address());
	});

	process.on("SIGINT", () => server.close());
	process.on("SIGTERM", () => server.close());

	return server;
})();

import * as http from "http";

export default (function () {
	// Create an app
	const app = (req: http.IncomingMessage, res: http.ServerResponse) => {
		res.setHeader("Content-Type", "application/json");
		res.write(`{"hello":"world"}`);

		res.end();
	};

	console.log(`app is a ${typeof app} that takes ${app.length} parameters`);

	// Create the server
	const server = http
		.createServer(app)
		.listen(3000, function (this: http.Server) {
			console.log("Listening for HTTP on %j", this.address());
		});

	// Allow graceful shutdown
	process.on("SIGINT", () => server.close());
	process.on("SIGTERM", () => server.close());

	// Watch open connections
	setInterval(() => {
		server.getConnections((error, connections) => {
			console.log({ now: new Date(), connections });
		});
	}, 1000).unref();

	return server;
})();

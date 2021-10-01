# Agenda

- Node http server
	- https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_http_createserver_options_requestlistener
	- When you dont do anything on `request`, the request will be pending forever and eventually timeout
	- You need to `.end()` the request!
		- This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, `response.end()`, MUST be called on each response.

- Connect
	- https://github.com/senchalabs/connect
	- Connect is an extensible HTTP server framework for node using "plugins" known as _middleware_.
	- Allows you to "plugin" handlers into the `(req, res) => { res.end(); }` server function using `.use()`
	- 

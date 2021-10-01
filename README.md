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
	- `connect()` create function `(req, res) => {}` that can be used with `http.createServer()`

- Express
	- https://github.com/expressjs/express
	- Builds upon (or did build upon) Connect
	- More syntactic sugar and convenience functions, but same pattern

- Middleware
	- Add handlers to the stack with `.use(handler)`
	- There can (and will) be multiple handlers!
	- A handler can be asynchronous and take longer to finish!
	- How to know if a handler fully served the request?
		- Either call `res.end()` (we're done) or `next()` (nah, let the next handler do stuff)
		- Some response methods implicitly end the request, like `.json()`, `.sendFile()`, etc.
	- `async (req, res)` is a major fail!!!
		- Assume the handler actually calls `res.end()`
		- What happens if the handler throws an error? Who will notice?
			- Unhandled promise rejection AND dangling request!!!
		- Always do `async (req, res, next) => { try { ... } catch (error) { next(error); } }` to catch async errors!
		- Express v5 (currently alpha) will supoprt async handlers

- Middleware stack
	- Add multiple handlers at once with `.use(handler1, handler2, [handler3, handler4])`
	- The middleware stack is traversed until someone calls `res.end()`
		- If noone ends the request, it will stay dangling!
	- Make a handler only handle a certain path with `.use(path, handler)`
	- Make a handler only handle a certain method with `.METHOD(handler)`
	- Mix and match
	- Order is important!!!
	- You can even add multiple handlers for the exact same method and path
	- Call `next("route")` to end handling for the current route

- Not found handling
	- What happens if no handler matches the current request?
	- Request would stay dangling
	- Add a special handler to the end of your stack!
	- Express automatically adds a 404 handler, but its very simple (`Cannot ${method} ${path}`)

- Error handling
	- Handlers are async... What if an error occurs inside the app logic? Where to put it?
	- Just call `next(error)`
	- The app will continue to traverse the middleware stack until it finds an error handler
	- Error handlers have signature `(error, req, res, next) => {}` (`handler.length` is 4 instead of 2 or 3)
	- Allows for central error handling (i.e. logging, output the stack, error response format, ...)
	- Express automatically adds an error handler, but its very simple (`res.send(error.message)`)

- Router/Sub-Apps
	- Create a sub-app with `express.Router`
	- `express()` is in fact a router, with extra functionallity
	- You could also do `app.use(express())` to mount a complete express app
	- Calling `next("router")` will end handling for the current router

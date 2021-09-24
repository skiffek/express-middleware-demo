import type * as express from "express";
import createError from "http-errors";

export default function createNotFoundHandler(): express.RequestHandler {
	return (req, res, next) =>
		next(createError(404, `Cannot ${req.method} ${req.path}`));
}

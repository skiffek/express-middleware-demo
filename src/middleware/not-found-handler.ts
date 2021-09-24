import type * as express from "express";
import createError from "http-errors";

export default function createNotFoundHandler(): express.RequestHandler {
	return async (req, res, next) =>
		next(createError(404, `Cannot ${req.method} ${req.path}`));
}

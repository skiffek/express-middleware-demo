import type * as express from "express";
import createError, { HttpError } from "http-errors";

export default function createErrorHandler(): express.ErrorRequestHandler[] {
	return [
		async (error, req, res, next) =>
			next(error instanceof Error ? error : new Error(error)),

		async (error: Error, req, res, next) =>
			next(createError.isHttpError(error) ? error : createError(500, error)),

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (error: HttpError, req, res, next) =>
			res.status(error.status).json({
				name: error.name,
				message: error.message,
			}),
	];
}

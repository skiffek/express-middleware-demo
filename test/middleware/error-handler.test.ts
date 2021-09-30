import type * as express from "express";

import createErrorHandler from "../../src/middleware/error-handler";

describe("error-handler", () => {
	const errorHandler = createErrorHandler();

	const next = jest.fn();
	const status = jest.fn().mockReturnThis();
	const json = jest.fn().mockReturnThis();

	const req = {} as unknown as express.Request;
	const res = { status, json } as unknown as express.Response;

	it("is an error request handler", async () => {
		expect(errorHandler).toBeInstanceOf(Function);
		expect(errorHandler).toHaveLength(4);
	});

	it("sets status and outputs error details", async () => {
		const error = new Error("foo");

		await errorHandler(error, req, res, next);

		expect(next).not.toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			name: error.name,
			message: error.message,
		});
	});
});

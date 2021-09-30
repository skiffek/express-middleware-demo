import type * as express from "express";

import createNotFoundHandler from "../../src/middleware/not-found-handler";

describe("not-found-handler", () => {
	const notFoundHandler = createNotFoundHandler();

	const next = jest.fn();
	const status = jest.fn().mockReturnThis();
	const json = jest.fn().mockReturnThis();

	const req = {} as unknown as express.Request;
	const res = { status, json } as unknown as express.Response;

	it("is a request handler", async () => {
		expect(notFoundHandler).toBeInstanceOf(Function);
		expect(notFoundHandler).toHaveLength(3);
	});

	it("creates a 404 error", async () => {
		await notFoundHandler(req, res, next);

		expect(json).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
	});
});

import { expect } from "chai";
import * as sinon from "sinon";

import type * as express from "express";

import createNotFoundHandler from "../../src/middleware/not-found-handler";

describe("not-found-handler", () => {
	const notFoundHandler = createNotFoundHandler();

	it("is a request handler", async () => {
		expect(notFoundHandler).to.be.a("function").with.length(3);
	});

	it("creates a 404 error", async () => {
		const req = {} as express.Request;
		const res = {} as express.Response;
		const next = sinon.spy();

		await notFoundHandler(req, res, next as express.NextFunction);

		expect(next.getCalls()).to.have.lengthOf(1);
		expect(next.getCall(0).firstArg).to.be.instanceOf(Error);
	});
});

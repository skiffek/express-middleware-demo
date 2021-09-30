import { expect } from "chai";

import createErrorHandler from "../../src/middleware/error-handler";

describe("error-handler", () => {
	const errorHandler = createErrorHandler();

	it("is an array of error request handlers", async () => {
		expect(errorHandler).to.be.a("function").with.length(4);
	});
});

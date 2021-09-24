import { expect } from "chai";

import createErrorHandler from "../../src/middleware/error-handler";

describe("error-handler", () => {
	const errorHandlers = createErrorHandler();

	it("is an array of error request handlers", async () => {
		expect(errorHandlers).to.be.an("array");

		for (const errorHandler of errorHandlers)
			expect(errorHandler).to.be.a("function").with.length(4);
	});
});

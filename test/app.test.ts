import { expect } from "chai";

import app from "../src/app";

describe("app", async () => {
	it("is a function", () => {
		expect(app).to.be.a("function");
	});
});

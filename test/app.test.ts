import app from "../src/app";

describe("app", () => {
	it("is a function", async () => {
		expect(app).toBeInstanceOf(Function);
	});
});

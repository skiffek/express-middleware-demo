const chai = require("chai");

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

module.exports = {
	spec: ["tests/**/*.ts"],
	require: [
		"ts-node/register",
		"source-map-support/register"
	]
};

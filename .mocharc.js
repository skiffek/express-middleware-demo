const chai = require("chai");

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

module.exports = {
	parallel: true,
	recursive: true,
	extension: ["js", "ts"],
	require: [
		"ts-node/register",
		"source-map-support/register"
	]
};

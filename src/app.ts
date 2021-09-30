import express, { Application } from "express";

import notFoundHandler from "./middleware/not-found-handler";
import errorHandler from "./middleware/error-handler";

export default (function (this: Application): Application {
	this.enable("trust proxy");
	this.enable("case sensitive routing");
	this.enable("strict routing");
	this.disable("x-powered-by");

	this.use(express.json());

	this.use(notFoundHandler());
	this.use(errorHandler());

	return this;
}.call(express()));

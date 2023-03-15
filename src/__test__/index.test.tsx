import request from "supertest";
import path from "path";
// const request = require("supertest");
import fs from "fs";
import { app } from "../server";
// const app = require("../server");
describe("Testing some apis", () => {
	test("Fetching single file from table", async () => {
		const res = await request(app).get("/api/file/p3rls0JLKE03x0mxlTY4");

		expect(res.body.name).toEqual(
			"d0a05a5f-ff00-4ee9-a023-c1493187813dundefined"
		);
		expect(res.body.url).toEqual(
			"https://firebasestorage.googleapis.com/v0/b/stride-gym.appspot.com/o/files%2F%20d0a05a5f-ff00-4ee9-a023-c1493187813dundefined?alt=media&token=da691b74-ab61-48af-b238-8e131e8af63b"
		);

		expect(res.body.id).toEqual("p3rls0JLKE03x0mxlTY4");
	});
	// test("Testing a single image file", async () => {
	// 	const res = await request(app).get("/api/file/getAll");

	// 	expect(res.body.length).toEqual(3);
	// });

	test("Testing file upload feature ", async () => {
		const image = path.resolve(__dirname, "./thumbnail.jpeg");

		const res = await request(app)
			.post("/api/file/")
			.set("content-type", "multipart/form-data")
			.attach("imageFile", `${__dirname}/thumbnail.jpeg`);
		expect(res.status).toBe(200);
	});
});

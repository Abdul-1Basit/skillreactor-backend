"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
// import { app } from "../../index";
const __1 = __importDefault(require("../.."));
// const app = require("../server");
describe("Testing some apis", () => {
    test("Fetching single file from table", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get("/api/file/p3rls0JLKE03x0mxlTY4");
        expect(res.body.name).toEqual("d0a05a5f-ff00-4ee9-a023-c1493187813dundefined");
        expect(res.body.url).toEqual("https://firebasestorage.googleapis.com/v0/b/stride-gym.appspot.com/o/files%2F%20d0a05a5f-ff00-4ee9-a023-c1493187813dundefined?alt=media&token=da691b74-ab61-48af-b238-8e131e8af63b");
        expect(res.body.id).toEqual("p3rls0JLKE03x0mxlTY4");
    }));
    // test("Testing a single image file", async () => {
    // 	const res = await request(app).get("/api/file/getAll");
    // 	expect(res.body.length).toEqual(3);
    // });
    test("Testing file upload feature ", () => __awaiter(void 0, void 0, void 0, function* () {
        const image = path_1.default.resolve(__dirname, "./thumbnail.jpeg");
        const res = yield (0, supertest_1.default)(__1.default)
            .post("/api/file/")
            .set("content-type", "multipart/form-data")
            .attach("imageFile", `${__dirname}/thumbnail.jpeg`);
        expect(res.status).toBe(200);
    }));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/imgRoutes.ts');
const dotenv = require('dotenv');
const app = (0, express_1.default)();
dotenv.config();
// middlewares
// app.use(fileUpload({
//   createParentPath: true
// }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes
app.use('/api/file', fileRoutes);
app.get('/', (req, res) => {
    res.send('Application works!');
    // console.log('request recieved',req.files)
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running Backend on port ${port}.`));
exports.default = app;

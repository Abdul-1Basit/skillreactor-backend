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
Object.defineProperty(exports, "__esModule", { value: true });
// import fileUpload, { UploadedFile } from 'express-fileupload';
// import { blob } from 'stream/consumers';
const firebase_1 = require("../../firebase");
const addImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // addImage,getAllImages,getSpecificImage,searchImages
    // console.log(req)
    // const newFile = req.file;
    // console.log("file", req.file)
    // return
    if (!req.file) {
        // req.files
        return res.status(400).send('Please add a file');
    }
    const receivedFile = req.file;
    const fileDetails = yield (0, firebase_1.uploadImage)(receivedFile.buffer);
    // console.log('filedetails',fileDetails)
    if (fileDetails) {
        try {
            const newFIleType = {
                id: null,
                name: fileDetails.fileName,
                url: fileDetails.url
            };
            if (yield (0, firebase_1.addImageToTable)(newFIleType)) {
                return res.status(200).send(newFIleType);
            }
            else {
                return res.status(500).send('Failed to add it to table');
            }
        }
        catch (err) {
            // console.log('error',err)
            return res.status(400).send(err);
        }
    }
});
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileList = yield (0, firebase_1.getAllFiles)();
        return res.status(200).send(fileList);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
const getSpecificImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('caled getSpecificImage',req.params)
    var _a;
    try {
        if (!req.params) {
            return res.status(400).send('Image name is required is empty');
        }
        const fileList = yield (0, firebase_1.getSpecificImageFromTable)((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
        if (fileList) {
            return res.status(200).send(fileList);
        }
        else {
            return res.status(404).send('Not found');
        }
    }
    catch (err) {
        console.log('err', err);
        return res.status(500).send(err);
    }
});
const searchImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log(req.params);
    console.log('caled');
    try {
        if (!req.params) {
            return res.status(400).send('Search query is empty');
        }
        const fileList = yield (0, firebase_1.getSearchBasedFiles)((_b = req.params) === null || _b === void 0 ? void 0 : _b.searchQuery);
        return res.status(200).send(fileList);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
module.exports.addImage = addImage;
module.exports.getAllImages = getAllImages;
module.exports.getSpecificImage = getSpecificImage;
module.exports.searchImages = searchImages;

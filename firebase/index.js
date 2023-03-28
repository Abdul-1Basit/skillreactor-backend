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
exports.getSpecificImageFromTable = exports.getSearchBasedFiles = exports.getAllFiles = exports.addImageToTable = exports.uploadImage = exports.storage = exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const uuid_1 = require("uuid");
const firebaseConfig = {
    apiKey: "AIzaSyAJXsLap4tS4O3Z2vSk1cektmNEeu3O9d0",
    authDomain: "stride-gym.firebaseapp.com",
    projectId: "stride-gym",
    storageBucket: "stride-gym.appspot.com",
    messagingSenderId: "124741781230",
    appId: "1:124741781230:web:8e0f6a25aa87e2e44ed5ff",
    measurementId: "G-TMLYWTFMQH",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
//------------------imageupload----------------
const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileName = (0, uuid_1.v4)() + image.originalname;
        let storageRef = (0, storage_1.ref)(storage, `/files/ ${fileName}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        let result = yield (0, storage_1.uploadBytesResumable)(storageRef, image);
        let returnurl = yield (0, storage_1.getDownloadURL)(result.ref);
        // console.log("return url", returnurl);
        return { url: returnurl, fileName: fileName };
    }
    catch (e) {
        console.log("error", e);
        return null;
    }
});
exports.uploadImage = uploadImage;
//-----------creating file table--------
const addImageToTable = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, url } = file;
    //console.log("capmpig", campaign);
    try {
        yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "images"), {
            name,
            url,
        });
        return true;
    }
    catch (err) {
        console.log("error", err);
        return false;
    }
});
exports.addImageToTable = addImageToTable;
const getAllFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(db, "images"));
    let newData = [];
    querySnapshot.forEach((doc) => {
        let temp = doc.data();
        temp.id = doc.id;
        newData.push(temp);
    });
    return newData;
});
exports.getAllFiles = getAllFiles;
const getSearchBasedFiles = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const refDoc = yield (0, firestore_1.collection)(db, 'images');
    const snapshot = yield (0, firestore_1.getDocs)(refDoc);
    let tempList = [];
    snapshot.docs.map(doc => {
        let temp = doc.data();
        if (temp.name.includes(searchQuery)) {
            temp.id = doc.id;
            tempList.push(temp);
        }
    });
    return tempList;
    // const categoryProductsCollection = query(collection(db, "images"), where("id", "<=", searchQuery))
    //  const qs = await getDocs(categoryProductsCollection);
    //  console.log('cata',categoryProductsCollection)
    // 	return;
    // const querySnapshot = await getDocs(categoryProductsCollection);
    // let newData:any = [];
    // querySnapshot.forEach((doc) => {
    // 	let temp = doc.data();
    // 	temp.id = doc.id;
    // 	newData.push(temp);
    // });
    // console.log('qs', qs.docs)
    // 	const citiesRef =await collection(db, "images");
    // const snapshot = await citiesRef.where('capital', '==', true).get();
    // if (snapshot.empty) {
    //   console.log('No matching documents.');
});
exports.getSearchBasedFiles = getSearchBasedFiles;
// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
// 	return;
// return newData;
// };
const getSpecificImageFromTable = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prodRef = yield (0, firestore_1.doc)(db, "images", id);
    const returnedVal = yield (0, firestore_1.getDoc)(prodRef);
    if (returnedVal.exists()) {
        let val = returnedVal.data();
        val.id = returnedVal.id;
        return val;
    }
    return null;
    // const categoryProductsCollection = query(collection(db, "images"), where("name", "==", imageName.toLowerCase().trim()))
    //  const imageRef = await doc(db, "images", id);
    // const citiesRef = db.collection('cities');
    // const snapshot = await citiesRef.where('capital', '==', true).get();
    // if (snapshot.empty) {
    //   console.log('No matching documents.');
    //   return;
    // }  
    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    // // const cityRef = collection(db, 'cities').doc('SF');
    // const doc = await getDoc(imageRef);
    // if (!doc.exists) {
    // //   console.log('No such document!');
    // 	return null;
    // } else {
    // //   console.log('Document data:', doc.data());
    // 	return doc.data()
    // } 
    // 	 const imageRef = await doc(db, "images", id);
    // 	// const querySnapshot = await getDoc(imageRef);
    // 	const querySnapshot = await getDoc(imageRef);
    // // if(querySnapshot)
    // 	if (querySnapshot) {
    // 		return querySnapshot;
    // 	}
    // return null;
});
exports.getSpecificImageFromTable = getSpecificImageFromTable;

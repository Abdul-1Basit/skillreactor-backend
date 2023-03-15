import { UploadedFile } from "express-fileupload";
import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
	getDoc,
} from "firebase/firestore";

import {
	getStorage,
	uploadBytesResumable,
	getDownloadURL,
	ref,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
	apiKey: "AIzaSyAJXsLap4tS4O3Z2vSk1cektmNEeu3O9d0",
	authDomain: "stride-gym.firebaseapp.com",
	projectId: "stride-gym",
	storageBucket: "stride-gym.appspot.com",
	messagingSenderId: "124741781230",
	appId: "1:124741781230:web:8e0f6a25aa87e2e44ed5ff",
	measurementId: "G-TMLYWTFMQH",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
interface fileType{
	id: string | null;
	name: string;
	url: string;
}
//------------------imageupload----------------
const uploadImage = async (image:any) => {
	try {
		let fileName = v4() + image.originalname;
		let storageRef = ref(storage, `/files/ ${fileName}`);

		// progress can be paused and resumed. It also exposes progress updates.
		// Receives the storage reference and the file to upload.
		let result = await uploadBytesResumable(storageRef, image);

		let returnurl = await getDownloadURL(result.ref);
		// console.log("return url", returnurl);
		return { url: returnurl, fileName: fileName };
	} catch (e) {
		console.log("error", e);
		return null;
	}
};

//-----------creating file table--------
const addImageToTable = async (file:fileType) => {
	const { name, url } = file;
	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "images"), {
			name,
			url,
		});
		return true;
	} catch (err) {
		console.log("error", err);
		return false;
	}
};
const getAllFiles = async () => {

	const querySnapshot = await getDocs(collection(db, "images"));
	let newData:any = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const getSearchBasedFiles = async (searchQuery: string) => {
	const refDoc = await collection(db, 'images');
	const snapshot = await getDocs(refDoc);
	let tempList:any=[]
	snapshot.docs.map(doc => {
		let temp = doc.data();
		if (temp.name.includes(searchQuery)) {
			temp.id = doc.id;
			tempList.push(temp)
		}
	});  return tempList;

	
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
}  

// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
// 	return;
	// return newData;
// };
const getSpecificImageFromTable = async (id:string) => {

	const prodRef = await doc(db, "images", id);
const returnedVal=await getDoc(prodRef);
	if (returnedVal.exists()) {
		let val = returnedVal.data();
		val.id =returnedVal.id;
	return	val;
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
};


export { auth, db, storage, uploadImage, addImageToTable, getAllFiles,fileType,getSearchBasedFiles,getSpecificImageFromTable };



import { Request, Response } from 'express';
// import fileUpload, { UploadedFile } from 'express-fileupload';
// import { blob } from 'stream/consumers';
import { uploadImage, addImageToTable, getAllFiles, fileType ,getSearchBasedFiles,getSpecificImageFromTable} from '../../firebase'


const addImage = async (req: Request, res: Response) => {
    // addImage,getAllImages,getSpecificImage,searchImages
    // console.log(req)
    // const newFile = req.file;
    // console.log("file", req.file)
    // return
    if (!req.file) {
     return   res.status(400).send('Please add a file');
 }
    const receivedFile = req.file;
    const fileDetails = await uploadImage(receivedFile.buffer)
    // console.log('filedetails',fileDetails)
    if (fileDetails) {
        try {
            const newFIleType: fileType = {
                id:null,
                name: fileDetails.fileName,
                url: fileDetails.url   
            }
            if(await addImageToTable(newFIleType)){
                return res.status(200).send(newFIleType)
            }
            else {
                return res.status(500).send('Failed to add it to table')
                
            }
        }
        catch (err) {
            // console.log('error',err)
            return res.status(400).send(err);
        }
    }
}

const getAllImages= async(req: Request, res: Response)=>{
    try {
        
        const fileList = await getAllFiles();
        return  res.status(200).send(fileList)
    }catch(err){
        return     res.status(500).send(err)
    }
}
const getSpecificImage = async (req: Request, res: Response) => {
    // console.log('caled getSpecificImage',req.params)

    try {
        if (!req.params) {
            return res.status(400).send('Image name is required is empty');

        }
        const fileList = await getSpecificImageFromTable(req.params?.id);
        if(fileList){
            return res.status(200).send(fileList)
        }
        else {
            return     res.status(404).send('Not found')

        }
    } catch (err) {
        console.log('err',err)
        return     res.status(500).send(err)
    }
}
const searchImages = async (req: Request, res: Response) => {
    console.log(req.params)
console.log('caled')
     try {
        if (!req.params) {
            return   res.status(400).send('Search query is empty');

        }
        const fileList = await getSearchBasedFiles(req.params?.searchQuery);
        return  res.status(200).send(fileList)
    }catch(err){
        return     res.status(500).send(err)
    }
}

module.exports.addImage=addImage
module.exports.getAllImages=getAllImages
module.exports.getSpecificImage=getSpecificImage
module.exports.searchImages=searchImages

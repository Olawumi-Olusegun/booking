
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY as string,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET as string,
});

// export const uploadImage = async (imageFile: Express.Multer.File) => {

//     try {
//         return new Promise((resolve, reject) => {
//             cloudinary.uploader.upload(imageFile.path, (result, error) => {
//                 if(error) {
//                     return reject(resolve);
//                 }

//                 resolve({
//                     url: result.
//                 })

//             })
//         });
//     } catch (error) {
        
//     }
// }

export default cloudinary;
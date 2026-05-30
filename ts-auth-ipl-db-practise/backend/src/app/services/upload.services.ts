import { imagekit } from "../utils/imagekit.js";
import { ApiError} from "../utils/ApiError.js";

export const uploadImageService = async(file: Express.Multer.File): Promise<any> => {
    
    if(!file){
        throw new ApiError(
            404, 
            null,
            "file not uploaded!",
            []
        )
    }


    const uploaded = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "players/profile"
    })


    return uploaded
}
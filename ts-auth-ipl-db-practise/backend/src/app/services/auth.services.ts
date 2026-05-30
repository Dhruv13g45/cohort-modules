import { eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { players } from "../db/schema.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcrypt"
// import type {bcrypt} from "brcypt"
import { uploadImageService } from "./upload.services.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js"

type loginCredentials = {
    email: string,
    password: string
}

type registerCredentials = {
    username: string,
    email:string,
    password: string,
    photo:Express.Multer.File
}

const registerService = async (data: registerCredentials) => {

    const {username, email, password, photo} = data

    if(!username || !email || !password){
        throw new ApiError(404, null, "Any of the fields cannot be empty !", [])
    }
    
    if (!photo){
        throw new ApiError(404, null, "Photo upload is needed !", [])
    }

    const profilePhoto = await uploadImageService(photo)

    const alreadyRegisteredUser = await db.select().from(players).where(
        eq(players.email, email)
    )

    if (alreadyRegisteredUser.length) {
        throw new ApiError(409, null, "User already exists !", [])
    }

    const hashPassword = bcrypt.hashSync(password, 10) // salt round

    const result = await db.insert(players).values({
        username,
        email,
        password:hashPassword,
        photo: profilePhoto?.url
    })
    .returning()


    console.log(result)

    return result
}


const loginService = async (data:loginCredentials) => {

    const {email, password} = data

    if(!email || !password){
        throw new ApiError(404, null, "Email and password are mandatory", [])
    }

    const [user] = await db.select().from(players).where(
        eq(players.email, email)
    )


    if (!user) {
        throw new ApiError(404, null, "User not found", [])
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new ApiError(401, null, "Invalid credentials", [])
    }

    const accessToken = generateAccessToken({ id: user.id, email: user.email })
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

    

    return { user, accessToken, refreshToken }

}


const logoutService = async (id:number | string) => {}


const getMeService = async (id:number | string) => {}


export {loginService, logoutService, registerService, getMeService}
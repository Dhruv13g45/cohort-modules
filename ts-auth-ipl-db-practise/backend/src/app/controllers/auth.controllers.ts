import { loginService, registerService } from "../services/auth.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type {Request, Response} from "express";


const loginController = asyncHandler(async(req:Request, res:Response)=>{

    const {email, password} = req?.body

    const loggedInUser = await loginService({email, password})

    // ApiResponse()
})


const registerController = asyncHandler(async(req:Request, res:Response)=>{

    const {username, email, password, photo} = req?.body

    const registeredUser = await registerService({username, email, password, photo})

    // ApiResponse()
})




const logoutController = asyncHandler(async(req:Request, res:Response)=>{

    const {id} = req?.body

    const loggedOutUser = await registerService(id)

    // ApiResponse()
})



const getMeController = asyncHandler(async(req:Request, res:Response)=>{

    const {id} = req?.body

    const currentUser = await registerService(id)

    // ApiResponse()
})

export {loginController, registerController, logoutController, getMeController}
import jwt from "jsonwebtoken"

type userData = {
    id: string,
    email: string,
}

export const generateToken = (userPayload: userData) =>{

    return jwt.sign(userPayload, process.env.JWT_SECRET!,{
        expiresIn: "7h"
    } )
}


export const verifyToken = (token: string) =>{

    const payload = jwt.verify(token, process.env.JWT_SECRET!)

    if(!payload){
        throw new Error("Error while retriving the payload to verify")
    }

    return payload
}
import jwt from "jsonwebtoken"

type TokenPayload={
    id: string,
    name: string
}

const ACCESS_SECRET:string = process.env.JWT_ACCESS_SECRET_KEY as string
const REFRESH_SECRET:string = process.env.JWT_ACCESS_SECRET_KEY as string


export const generateAccessToken = (payload:TokenPayload):string => { 

    const accessToken:string = jwt.sign(payload, ACCESS_SECRET, {expiresIn: "1d"})

    return accessToken
}

export const generateRefreshToken = (payload:TokenPayload):string => {
    const refreshToken:string = jwt.sign(payload, REFRESH_SECRET, {expiresIn: "7d"})

    return refreshToken
}


export const verifyAccessToken =()=>{}
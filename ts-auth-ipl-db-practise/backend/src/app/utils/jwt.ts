import jwt from "jsonwebtoken"

import type {
    Secret,
    SignOptions
} from "jsonwebtoken"

type TokenPayload = {
    id: string | number
    email: string
}

export const generateAccessToken =(payload: TokenPayload) => {

        const secret: Secret =
            process.env.JWT_ACCESS_SECRET!

        const options: any = {
            expiresIn:
                process.env.JWT_ACCESS_EXPIRES || "1h"
        }

        return jwt.sign(
            payload,
            secret,
            options
        )
}


export const generateRefreshToken =(payload: TokenPayload) => {

        const secret: Secret =
            process.env.JWT_REFRESH_SECRET!

        const options: any = {
            expiresIn:
                process.env.JWT_REFRESH_EXPIRES || "7d"
        }

        return jwt.sign(
            payload,
            secret,
            options
        )
}


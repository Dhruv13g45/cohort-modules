import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyToken = async(req:Request, res: Response, next:NextFunction) =>{

    const headers = req.headers.authorization

    if (!headers){
         return res
            .status(401)
            .json({
                message:
                "Unauthorized"
            })
    }

    const token = headers.split(" ")[1]

    if (!token) {
        return res
            .status(401)
            .json({
                message:
                "Unauthorized"
            })
    }

    try{
        const decoded =
            jwt.verify(
                token,
                process.env
                .JWT_ACCESS_SECRET!
            )

        req.user = decoded

        next()
    }
    catch(error){
          return res
            .status(401)
            .json({
                message:
                "Token expired"
            })
    }
}
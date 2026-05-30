import type { NextFunction, Request, Response } from "express";

export const globalErrorMiddleware = async(err:any, req:Request, res:Response, next: NextFunction)=>{
    return res.json({
        statusCode: err.statusCode,
        success: false,
        message: err.message
    })

}
import express, { Router } from "express"
import dotenv from "dotenv"
import cors from "cors"
import type {Request, Response } from "express"
import { globalErrorMiddleware } from "./app/utils/globalErrorMiddleware.js"


export function main() {

    try {
        
        const app = express()
        app.use(express.json())
        app.use(cors())
        dotenv.config({
            path: "./env"
        })
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT)
        })

        const demoRouter = Router()
        demoRouter.get("/health", (req:Request,res:Response)=>{
            res.send("Health route working properly")
        })

        app.use(globalErrorMiddleware)

    } catch (error) {
        console.log("Error while creating the server application in main function", error)
    }
}

main()
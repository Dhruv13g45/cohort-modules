import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { generateHashedPassword } from "../utils/generateHashPassword.js";

const registerUser = async (req: Request, res: Response) => {

    const { name, email, password, phone_number } = req.body

    if (!name || !email || !password || !phone_number) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingEmail = await db.select().from(userTable).where(eq(userTable.email, email))

    if (existingEmail.length > 0) {
        return res.status(300).json({
            message: "Email already exists"
        })
    }

    const hashedPassword = await generateHashedPassword(password)

    if (hashedPassword === null) {
        return res.status(500).json({
            message: "Error while hashing password"
        })
    }


    try {
        const [user] = await db.insert(userTable).values({
            name,
            email,
            password: hashedPassword,
            phoneNumber: phone_number
        }).returning()

        return res.status(201).json({
            message: "Created user successfully",
            data: user
        })
    } catch (error) {
        console.log(error)
    }


}


const loginUser = async (req: Request, res: Response) => { }





const verifyToken = async (req: Request, res: Response) => { }


export {
    registerUser,
    loginUser,
    verifyToken
}

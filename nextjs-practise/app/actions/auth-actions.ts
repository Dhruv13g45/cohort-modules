"use server"
import { eq } from "drizzle-orm"
import { usersTable } from "../src/db/schema"
import { db } from "../src/index"
import bcrypt from "bcrypt"
import { generateToken } from "../libs/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export const signUpUser = async(formData: FormData) =>{

    const userData: Record<string, FormDataEntryValue> = {}

    formData.forEach((value, key)=>{
        userData[key] = value
    })

    if(Object.entries(userData).length === 0){
        throw new Error("Cannot get the user data!!")
    }

    const mail = userData["email"].toString()

    if (typeof mail !== "string") {
        throw new Error("Email must be a string")
    }

    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, mail))

    if(existingUser.length > 0){
        throw new Error("User already exists please login !!")
    }

    if(userData["password"].toString() !== userData["confirmPassword"].toString()){
        throw new Error("Password and confirm password  dont match each other !!")
    }

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(userData["password"].toString(), salt)

    if(!hashedPassword){
        throw new Error("Cannot encrypt the password !!")
    }


    const [newUser] = await db.insert(usersTable).values({
        username: userData["name"].toString(),
        email: userData["email"].toString(),
        password: hashedPassword
    }).returning()

    if(!newUser){
        throw new Error("Error while creating a user !!")
    }


    return {
        success: true,
        message: "User created successfully !!"
    }
}


export const loginUser = async(formData: FormData) => {

    const userPayload:Record<string, FormDataEntryValue> = {}

    formData.forEach((value, key)=>{
        userPayload[key] = value
    })

    console.log(userPayload)

    const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, userPayload['email'].toString()))

    if(!existingUser){
        throw new Error("User does not exists first signup !!")
    }

    const confirmPassword = bcrypt.compareSync(userPayload["password"].toString(), existingUser?.password) ? true : false

    if(confirmPassword === false){
        throw new Error("Password is wrong !!")
    }

    const token = generateToken({id: existingUser?.id.toString(), email:existingUser?.email})

    if(!token){
        throw new Error("Couldn't generate tokens")
    }

    const cookieStore = await cookies()

    cookieStore.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })

    redirect("/all-todos")
}
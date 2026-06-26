"use server";

import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";





interface userData {
    
}

export const signup = async (formData: FormData) => {

  const username = (formData.get("username") as string).trim() ?? "";
  const email = (formData.get("email") as string).trim() ?? "";
  const password = (formData.get("password") as string).trim() ?? "";

  if (!username || !email || !password) {
    throw new Error("username, email, password all of them are required !!");
  }

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    throw new Error("User already exists Please login !!");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(usersTable)
    .values({
      username: username,
      email: email,
      password: hashPassword,
    })
    .returning();

  if (!newUser) {
    throw new Error("Error while creating new user from db !!");
  }

  return NextResponse.json({
    message: "Created new user sucessfully",
    status: 200,
    user: newUser,
  });
};


export const login = async(formData: FormData) => {
    // get login credentials
    // check if email exist
    // if not tell to eregister
    // if yess then compare password
    // if not same informa user
    // if same then generate a jwt token for user and send it to user via cookies 
    // and then provide the access


    const email = (formData.get("email") as string).trim() ?? ""
    const password = (formData.get("password") as string).trim() ?? ""

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length === 0) {
      throw new Error("User does not exists please sign up first !!");
    }

    const user = existingUser[0];

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new Error("Invalid password !!");
    }



}


const generateAccessToken = (userData: userData)=>{}
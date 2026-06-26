"use server"

import { db } from "@/src"
import { blogsTable, usersTable } from "@/src/db/schema"
import { NextResponse } from "next/server"

export async function createBlog(formData: FormData) {
    const title = (formData.get("blogTitle") as string)?.trim() ?? ""
    const content = (formData.get("blogContent") as string)?.trim() ?? ""

    if(!title || !content){
        return NextResponse.json({
            error: "Title and content are required"
        }, {
            status: 400
        })
    }

    const newBlog = {
        id: Date.now().toString(),
        title,
        content
    }

    return NextResponse.json(
        {
        message: "Blog created successfully",
        status: 201,
        data:newBlog,
        }
    )
}

export async function editBlog(formData: FormData) {
    const title = (formData.get("blogTitle") as string)?.trim() ?? ""
    const content = (formData.get("blogContent") as string)?.trim() ?? ""

    if(!title || !content){
        return NextResponse.json({
            error: "Title and content are required"
        }, {
            status: 400
        })
    }

    const updatedBlog = {
        id: Date.now().toString(),
        title,
        content
    }

    return NextResponse.json(
        {
        message: "Blog updated successfully",
        status: 200,
        data:updatedBlog,
        }
    )
}



export async function deleteBlog(id: string) {

    if(!id){
        return NextResponse.json({
            error: "Blog ID is required"
        }, {
            status: 400
        })
    }

    //db call to delete the blog with the given id

    return NextResponse.json(
        {
        message: "Blog deleted successfully",
        status: 200,
        }
    )
}



export async function getBlog(id:string) {

    if(!id){
        return NextResponse.json({
            error: "Blog ID is required"
        }, {
            status: 400
        })
    }

    //db call to fetch the blog with the given id

    return NextResponse.json(
        {
        message: "Blog fetched successfully",
        status: 200,
        }
    )

}
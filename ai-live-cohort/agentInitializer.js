import dotenv from 'dotenv';
import OpenAI from "openai"

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY;

export const apiKeyChecker = () =>{

    if(!apiKey) {
        console.error("GEMINI_API_KEY is not set in the environment variables.");
    }
    process.exit(1)
}


export const checkOpenAI = async () =>{

    const openai = (await import('openai')).default

    const client = new openai.OpenAI({
        apiKey: apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    })


    if(!client){
        console.error("Failed to initialize OpenAI client. Please check your API key.");
    }

    console.log("OpenAI client initialized successfully.");
    return client;
}

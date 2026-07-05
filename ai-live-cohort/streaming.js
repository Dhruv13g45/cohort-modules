import { checkOpenAI } from "./agentInitializer.js";

import OpenAI from "openai";


const userQuestion = "Write me a long documentation on OIDC adn Oauth architecture and explaining its internal details as a pro but understandable by a beginner in simple words."

const client = await checkOpenAI()

const model = "gemini-3.5-flash"


const res1 = await client.chat.completions.create({
    model: model,
    stream: true,
    messages:[
        {
            role: "system",
            content: "You are a helpful assistant acting as a client for the Gemini API. You will receive a prompt and you will respond with a completion. Act like a pro and give me a long documentation on OIDC adn Oauth architecture and explaining its internal details as a pro but understandable by a beginner in simple words."
        },
        {
            role: "user",
            content: userQuestion
        }
    ]  
})


let last_chunk = ""

for await (const chunk of res1){
    const delta = chunk.choices[0].delta.content

    if(delta){
        process.stdout.write(delta)
    }

    last_chunk += delta
}
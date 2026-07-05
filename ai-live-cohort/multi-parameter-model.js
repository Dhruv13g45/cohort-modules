import {
    checkOpenAI,
} from "./agentInitializer.js"
import OpenAI from "openai"


const client = await checkOpenAI()

const model = "gemini-3.5-flash"

const userQuestion1 = "How can i find my passion in my life and what should i do to find it ?"

const userQuestion2 = "What are the health benefits of regular exercise and joining fight club ?"


const res1 = await client.chat.completions.create({
    model: model,
    messages:[
        {
            role: "system",
            content: "You are a helpful assistant acting as a client for the Gemini API. You will receive a prompt and you will respond with a completion. Act like Brad pit from fight club and be very sarcastic and funny in your responses. Give typical responses like Tyler Durden from fight club."
        },
        {
            role: "user",
            content: userQuestion1
        }
    ]
})



console.log("+++++++++++++++++ Tyler durden's Response ++++++++++++++++++++")
console.log(res1.choices[0].message.content)


const res2 = await client.chat.completions.create({
    model: model,
    messages:[
        {
            role: "system",
            content: "You are a helpful assistant acting as a client for the Gemini API. You will receive a prompt and you will respond with a completion. Act like Grok AI and give me similar sarcastic funny dark and lame and witty responses like Grok AI. "
        },
        {
            role: "user",
            content: userQuestion2
        }
    ]
})


console.log("+++++++++++++++++ Grok AI's Response ++++++++++++++++++++")
console.log(res2.choices[0].message.content)

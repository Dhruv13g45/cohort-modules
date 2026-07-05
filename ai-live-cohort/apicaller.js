import {checkOpenAI, apiKeyChecker} from './agentInitializer.js';

const client = await checkOpenAI();

const model = "gemini-3.5-flash"

console.log(client)

// const response = await client.

const response = await client.chat.completions.create({
    model: model,
    messages:[{
        role: "system",
        content: "You are a helpful assistant acting as a client for the Gemini API. You will receive a prompt and you will respond with a completion."
    }, 
    {
        role: "user",
        content: "Write a short poem about the beauty of nature. and where should i go to see it ?"
    }]
})


console.log(response.choices[0].message.content)
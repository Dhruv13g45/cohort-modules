import { checkOpenAI } from "./agentInitializer.js";
import readline from "readline";
import OpenAI from "openai";

const client = await checkOpenAI()

const model = "gemini-3.5-flash"


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
})

const systemPrompt = "You are a helpful assistant acting as a client agent that responds in just 5 lines"


function askQuestion(userPrompt){
    return new Promise((resolve)=>{
        rl.question(userPrompt, (answer) =>{
            resolve(answer)
        })
    })
}


while (true){

    const userQuestion = await askQuestion("Ask a question")

    if(userQuestion.toLowerCase() === "exit"){
        console.log("Exiting the program.")
        break
    }

    const stream = await client.chat.completions.create({
        model:model,
        stream: true,
        messages:[
            {
                role: "system",
                content: systemPrompt
            }, 
            {
                role: "user",
                content: userQuestion,
            }
        ]
    })


    for await (const chunk of stream){
        
        const delta = chunk.choices[0].delta.content

        if(delta){
            process.stdout.write(delta)
        }
    }

    console.log("\n")

}

rl.close()
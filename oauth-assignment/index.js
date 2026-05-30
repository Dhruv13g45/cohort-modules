import express from "express"


const app = express()

app.use(express.json())



app.get("/", (req,res)=>{
    console.log("initial routing")
    res.send("Hello World")
})

app.get("/.well-known/openid-configuration", (req,res)=>{
    console.log("Received request for OpenID configuration")

    res.json({
        issuer:"http://localhost:8000",
        authorization_endpoint:"http://localhost:8000/authorize",
        token_endpoint:"http://localhost:8000/token",
        userinfo_endpoint:"http://localhost:8000/userinfo",
        jwks_uri:"http://localhost:8000/jwks"
    })
})

app.listen(8000, ()=>{
    console.log("Server started listening")
})
const express = require("express")


function block_1_server(){
    return Promise((resolve)=>{
        const app = express()

        app.use(express.json())

        app.get("/all-orders", (req,res)=>{
            res.json({
                items:[
                    "Italian Thali",
                    "Bruschetta",
                    "Alio Olio Premavera Pasta"
                ]
            })
        })


        app.get("/order/:id" , (req,res)=>{
            const {id} = req.params

            res.json({
                item: id,
                price: 359,
            })
        })

        app.get("/search-order", (req,res)=>{
            const {query, limit} = req.query
            res.json({
                query: query,
                limit: limit,
            })
        })



        app.post("/create-order", (req,res)=>{
            const {order} = req.body
            res.status(201).json({
                order: order,
                status: "recieved"
            })
        })




        const server = app.listen(0, async()=>{
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            const getAllOrders = await fetch(`${base}/all-orders`)
        )
    })
}
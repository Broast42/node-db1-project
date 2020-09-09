const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//Welcome route
server.get("/", async (req, res, next) => {
	try {
		res.json({
			message: "Welcome",
		})
	} catch (err) {
		next(err)
	}
})

//CRUD Routes for accounts

//get all accounts
// server.get("/accounts", async (req, res, next) =>{
//     try{
//         const accounts = await db.select("*").from("accounts")
//         res.status(200).json(accounts)
//     } catch (err) {
//         next(err)
//     }
// })

//get all accounts with query options

server.get("/accounts", async (req, res, next) =>{
    
    try{   
        const accounts = await db("accounts").select("*").limit(req.query.limit).orderBy(req.query.sortby || "id", req.query.sortdir)
        res.status(200).json(accounts)
    } catch (err) {
        next(err)
    }
    
})

//get account by id
server.get("/accounts/:id", async (req, res, next) =>{
    try{
        const account = await db("accounts").select("*").where("id", req.params.id).first()
        res.json(account)
    } catch (err) {
        next(err)
    }
})

//Add an account
server.post("/accounts", async (req, res, next) =>{
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        const [id] = await db("accounts").insert(payload)
        const result = await db("accounts").where("id",id).first()

        res.json(result)

    } catch (err) {
        next(err)
    }
})

//Update an account
server.put("/accounts/:id", async (req, res, next) =>{
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }

        await db("accounts").where("id", req.params.id).update(payload)
        const result = await db("accounts").where("id", req.params.id).first()

        res.json(result)

    } catch (err) {
        next(err)
    }
})

//Delete an account
server.delete("/accounts/:id", async (req, res, next) =>{
    try{
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

//Default error route
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;

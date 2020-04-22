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
server.get("/accounts", async (req, res, next) =>{
    try{
        const accounts = await db.select("*").from("accounts")
        res.status(200).json(accounts)
    } catch (err) {
        next(err)
    }
})

//get account by id
server.get("/accounts/:id", async (req, res, next) =>{
    try{

    } catch (err) {
        next(err)
    }
})

//Add an account
server.post("/accounts", async (req, res, next) =>{
    try{

    } catch (err) {
        next(err)
    }
})

//Update an account
server.put("/accounts", async (req, res, next) =>{
    try{

    } catch (err) {
        next(err)
    }
})

//Delete an account
server.delete("/accounts", async (req, res, next) =>{
    try{

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

const express = require('express');

const app = express();

const checkTicket = (req,res,next)=>{

    const ticket = req.headers.ticket;
    if(ticket === "1234"){
        next();
    }else{
        res.send("invalid ticket");
    }
}

const checkUser = (req,res,next)=>{
    const user = req.headers.user;  
    if(user === "admin"){
        next();
    }else{
        res.send("invalid user");
    }
}

const checkRole = (req,res,next)=>{
    const role = req.headers.role;
    if(role === "admin"){
        next();
    }else{
        res.send("invalid role");
    }
}

app.get("/platform",checkTicket,checkUser,checkRole,(req,res)=>{
    console.log("all checks passed");
    res.send("allow access to platform");
});



app.listen(7777,()=>{
    console.log("server is running on port 7777")
})


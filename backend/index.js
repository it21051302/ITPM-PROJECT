const express=require('express')


const app=express()


app.get("/",(req,res)=>{
    res.send("hell world")
})




app.listen(8080,()=>{
    console.log('running')
})
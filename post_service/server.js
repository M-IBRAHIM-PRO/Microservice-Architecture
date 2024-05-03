import express from "express"
import Routes from "./routes/index.js"

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const PORT=3002 || process.env.PORT;

app.get('/',(req,res)=>{
    return res.status(200).json({message:"Post server is working..."});
})
app.use(Routes);

app.listen(PORT, ()=>console.log(`Post service is listening on PORT ${PORT}`));
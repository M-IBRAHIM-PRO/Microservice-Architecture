import express from "express"
import Routes from "./routes/index.js"

const app=express();
const PORT=3002 || process.env.PORT;
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Routes
app.use(Routes);

app.get('/',(req,res)=>{
    return res.status(200).json({message:"Post server is working..."});
})
app.listen(PORT, ()=>console.log(`Post service is listening on PORT ${PORT}`));
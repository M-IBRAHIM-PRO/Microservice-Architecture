import express from "express"
import Routes from "./routes/index.js"

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const PORT=3001 || process.env.PORT;

app.get('/',(req,res)=>{
    return res.status(200).json({message:"Auth server is working..."});
})
app.use(Routes);

app.listen(PORT, ()=>console.log(`Auth service is listening on PORT ${PORT}`));
const express=require('express')
const multer = require("multer");
const app=express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+file.originalname);
  },
});

const upload = multer({storage });

app.get('/',(req,res)=>{
  res.render('Login')
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.get('/signin',(req,res)=>{
  res.render("signin")
});

app.get("/create", (req, res) => {
  res.render("create");
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error("Mongoose connection error:", err));

const user_schema=new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: String,
  Country: String,
  State: String,
  City: String,
  Address: String,
  Zip: String,
  Company: String,
  Role: String,
});

const Users=mongoose.model("data",user_schema)

app.post('/post',async(req,res)=>{
  const {Name,Email,Phone,Country,State,City,Address,Zip,Company,Role}=req.body
  const user=new Users({
    Name,
    Email,
    Phone,
    Country,
    State,
    City,
    Address,
    Zip,
    Company,
    Role
  })
  await user.save()
  console.log(user)
  res.send("Form Submitted")
})

app.listen(3000,() => {
  console.log("Listening on 127.0.0.1:3000");
});
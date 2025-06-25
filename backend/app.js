const express=require('express')
const multer = require("multer");
const cors=require('cors');
const app=express();
const path = require("path");
app.set('view engine','ejs')
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/',(req,res)=>{
  res.render('Login')
});

app.get("/login", (req, res) => {
  res.render("Login",{message:""});
});

app.post("/login",async(req,res)=>{
  const {Email,Pass}=req.body;
  const user=await Users.findOne({Email})
  if((Email==="Admin") && (Pass==="Admin")){
    return res.redirect("Create")
    }else if (!user){
      return res.render("Login",{message:"User Not Found"})
      }else if(user.Pass!=Pass){
      return res.render("Login",{message:"Password Not matched"})
    }else{
      res.send("Welcome")
    }
  });

app.get("/signin", (req, res) => {
  res.render("signin",{message:""});
});

app.post('/signin',async(req,res)=>{
  const { Name, Pass, Email } = req.body;
  const data = { Name, Pass, Email };
  const existingUser=await Users.findOne({Email});
  if(existingUser){
    return res.render("signin", { message: "User Alredy exist" });
  }else{
    res.redirect("login")
    const user = new Users({ Name,Email,Pass});
    await user.save();
  }
});

app.get("/Users", async (req, res) => {
  try {
    const users = await Users.find();
    res.render("users", { users });
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

const mongoose = require("mongoose");
const { default: Signin } = require('../frontend/my-react-app/src/Signin');

mongoose
  .connect("mongodb://localhost:27017/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error("Mongoose connection error:", err));

const user_schema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: String,
  Country: String,
  State: String,
  Pass: String,
  Address: String,
  Zip: String,
  Company: String,
  Role: String,
  Image: {
    data: Buffer,
    contentType: String,
  },
});

const Users=mongoose.model("data",user_schema)

app.post('/post',upload.single('Image'),async(req,res)=>{
  const {Name,Email,Phone,Country,State,Pass,Address,Zip,Company,Role}=req.body
  const imageFile = req.file;
  const user = new Users({
    Name,
    Email,
    Phone,
    Country,
    State,
    Pass,
    Address,
    Zip,
    Company,
    Role,
    Image: {
      data: imageFile.buffer,
      contentType: imageFile.mimetype,
    },
  });
  await user.save()
  console.log(user)
  res.send("Form Submitted")
})

app.listen(3000,() => {
  console.log("Listening on 127.0.0.1:3000");
});
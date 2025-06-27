const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT} = require("./configurations/config.js");
const app = express();
app.use(express.json());
const user_routes =require("./routes/user_routes")
app.use(cors());
// const Users = require("./models/user_schema.js");
// const router = express.Router();
// const {Signup}=require("./controller/user_controller.js")

// mongoose.connect(MONGO_URL);

// const user_schema = new mongoose.Schema(
//   {
//     Name: String,
//     Email: String,
//     Phone: String,
//     Country: String,
//     State: String,
//     Pass: String,
//     Address: String,
//     Zip: String,
//     Company: String,
//     Role: String,
//     //   Image: {
//     //     data: Buffer,
//     //     contentType: String,
//     //   },
//   },
//   { timestamps: true }
// );

// const Users = mongoose.model("datas", user_schema);

// app.post("/Signup", async (req, res) => {
//   const { Name, Pass, Email } = req.body;
//   const existingUser = await Users.findOne({ Email });
//   if (existingUser) {
//     return res.status(409).json({ Message: "User already exists!" });
//   } else if (Name === "") {
//     return res.status(409).json({ Message: "Usename cant be empty!" });
//   } else if (!/\S+@\S+\.\S+/.test(Email)) {
//     return res.status(409).json({ Message: "Invalid Email" });
//   } else if (Pass.length <= 5) {
//     return res.status(409).json({ Message: "Select a strong Password" });
//   } else {
//     const user = new Users({ Name, Email, Pass });
//     await user.save();
//     return res
//       .status(201)
//       .json({ Message: "Registration successful", redirectTo: "/Signin" });
//   }
// });

//router.post("/Signup",Signup)

// app.post("/Signin", async (req, res) => {
//   try {
//     console.log("Recived Login data", req.body);
//     const { Email, Pass } = req.body;
//     const user = await Users.findOne({ Email });
//     if (Email === "Admin" && Pass === "Admin") {
//       return res
//         .status(201)
//         .json({ Message: "Registration successful", redirectTo: "/Users" });
//     } else if (!user) {
//       return res.status(409).json({ Message: "User not exists" });
//     } else if (user.Pass != Pass) {
//       return res.status(409).json({ Message: "Email and password mismatch" });
//     } else {
//       return res
//         .status(200)
//         .json({ Message: "Successful", redirectTo: `/UserInterface` });
//     }
//   } catch (err) {
//     console.error("error", err);
//   }
// });

// app.get("/Users", (req, res) => {
  
//   Users.find()
//     .then((users) => res.json({ users, Total: users.length }))
//     .catch((err) => res.json(err));
// });

// app.get("/Users/:email", async (req, res) => {
//   const user = await Users.findOne({ Email: req.params.email });
//   res.json({ user });
// });

// app.put("/Users/:email", async (req, res) => {
//   const { email } = req.params;
//   const updatedData = req.body;
//   console.log(updatedData);
//   await Users.updateOne({ Email: email }, { $set: updatedData });
//   res.json({ message: "User Updated", redirectTo: "/Users" });
// });

// app.delete("/Users/:email", async (req, res) => {
//   await Users.deleteOne({ Email: req.params.email });
//   res.json({ message: "User deleted" });
// });

app.use(user_routes);

app.listen(PORT, () => {
  console.log("Server running");
});

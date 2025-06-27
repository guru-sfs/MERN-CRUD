const connectDatabase=require("./connection")
const mongoose = require("mongoose");
connectDatabase()
const user_schema = new mongoose.Schema(
  {
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
    //   Image: {
    //     data: Buffer,
    //     contentType: String,
    //   },
  },
  { timestamps: true }
);

const Users = mongoose.model("datas", user_schema);

module.exports=Users
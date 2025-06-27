const mongoose = require("mongoose");
const { MONGO_URI } = require("../configurations/config.js");

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDatabase;

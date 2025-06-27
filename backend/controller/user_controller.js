const Users=require('../models/user_schema')

exports.Signup=async (req, res) => {
  const { Name, Pass, Email } = req.body;
  const existingUser = await Users.findOne({ Email });
  if (existingUser) {
    return res.status(409).json({ Message: "User already exists!" });
  } else if (Name === "") {
    return res.status(409).json({ Message: "Usename cant be empty!" });
  } else if (!/\S+@\S+\.\S+/.test(Email)) {
    return res.status(409).json({ Message: "Invalid Email" });
  } else if (Pass.length <= 5) {
    return res.status(409).json({ Message: "Select a strong Password" });
  } else {
    const user = new Users({ Name, Email, Pass });
    await user.save();
    return res
      .status(201)
      .json({ Message: "Registration successful", redirectTo: "/Signin" });
  }
};


exports.Signin= async (req, res) => {
  try {
    console.log("Recived Login data", req.body);
    const { Email, Pass } = req.body;
    const user = await Users.findOne({ Email });
    if (Email === "Admin" && Pass === "Admin") {
      return res
        .status(201)
        .json({ Message: "Registration successful", redirectTo: "/Users" });
    } else if (!user) {
      return res.status(409).json({ Message: "User not exists" });
    } else if (user.Pass != Pass) {
      return res.status(409).json({ Message: "Email and password mismatch" });
    } else {
      return res
        .status(200)
        .json({ Message: "Successful", redirectTo: `/UserInterface` });
    }
  } catch (err) {
    console.error("error", err);
  }
};

exports.Users= async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ users, Total: users.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserByEmail= async (req, res) => {
  const user = await Users.findOne({ Email: req.params.email });
  res.json({ user });
};

exports.putUsers=async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;
  console.log(updatedData);
  await Users.updateOne({ Email: email }, { $set: updatedData });
  res.json({ message: "User Updated", redirectTo: "/Users" });
};

exports.deleteUser=async (req, res) => {
  await Users.deleteOne({ Email: req.params.email });
  res.json({ message: "User deleted" });
};
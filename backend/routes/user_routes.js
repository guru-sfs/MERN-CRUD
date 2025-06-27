const express = require("express");
const router = express.Router();
const {
  Signup,
  Signin,
  Users,
  getUserByEmail,
  putUsers,
  deleteUser
} = require("../controller/user_controller");

router.post("/Signup", Signup);
router.post("/Signin", Signin);
router.get("/Users", Users);
router.get("/Users/:email", getUserByEmail);
router.put("/Users/:email", putUsers);
router.delete("/Users/:email",deleteUser)
module.exports = router;

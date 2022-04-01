const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verify = require("../verifyToken");

//jwt generation
router.post("/", async (req, res) => {
  try {
    const accessToken = jwt.sign(
      {
        name: req.body.name,
        mobile: req.body.mobile,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json(accessToken);
  } catch (err) {
    console.log(err);
  }
  try {
    const user = await new User({
      name: req.body.name,
      mobile: req.body.mobile,
    });
    const newuser = await user.save();
    console.log(newuser);
  } catch (err) {
    console.log(err);
  }
});

//jwt login
router.post("/login", verify, async (req, res) => {
  console.log(req.user.mobile);
  console.log(req.user.name);
  try {
    const user = await User.findOne({ name: req.user.name });
    !user && res.status(404).send("user not found");
    if (req.user.mobile === user.mobile) {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all students
router.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

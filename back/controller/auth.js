const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, repassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.json("User exists."); 
    }
    
    if (password == repassword) {
      const hashPassword = await bcrypt.hash(password, 12);
      const hashRepassword = await bcrypt.hash(repassword, 12);

      const newUser = await User.create({
        email,
        password: hashPassword,
        repassword: hashRepassword,
      });
      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.json("Successfull registration");
      console.log(newUser, token);
    } else {
      res.json("Password does not match.");
    }
  } catch (err) {
    res.json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json("User does not exists.");
    }
    const comparePass = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      user,
      token,
    });
    console.log(token);

    if (!comparePass) {
      res.json("Password is incorrect");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
 
};

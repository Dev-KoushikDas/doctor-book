import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const register = async (req, res,next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
     
     /*username:"test",
      email:"test",
      password:"test",
      country:"test"
    */
    ...req.body,
    password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
   // res.status(500).send(err);
   next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    console.log("Welcome to login!")
    const user = await User.findOne({ username: req.body.username });

    /*const err = new Error();
    err.status = 404;
    err.message = "User not found";*/
    
    // if (!user) return res.status(404).send("User not found");
    
    if(!user) return next(createError(404,"User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400,"Wrong password or username!"));

    const token = jwt.sign(
    {
    id: user._id,
    isSeller: user.isSeller,
    },
    process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
   // res.status(500).send("Something went wrong!");
   next(err)
  }
};


export const logout = async (req, res) => {
  res
  .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200).send("User has been logged out.");
};

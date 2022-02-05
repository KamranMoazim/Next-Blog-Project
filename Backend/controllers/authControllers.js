const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    User
        .findOne({
            email: req.body.email
        })
        .exec((err, user)=>{
            if(user){
                return res.status(400).json({
                    error:"Email is already taken!"
                })
            }
            const {name, email, password} = req.body;
            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;

            let newUser = new User({name, email, password, username, profile});
            newUser.save((err, success)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    })
                }
                // res.json({
                //    user:success
                // })
                res.json({message:"Signup Successfully!"})
            })
        })
}



exports.signin = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {email, password} = req.body;

    // check if user exist
    User
        .findOne({
            email: req.body.email
        })
        .exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"User with given Email do not exist. Please Signup!"
                })
            }
            // authenticate user
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error:"Email and Password do not match!"
                })
            }
            // generate a token and send to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
            res.cookie("token", token, {expiresIn:"1d"});
            const {_id, username, name, email, role} = user;
            return res.json({
                token, 
                // user
                user: {_id, username, name, email, role}
            });
        })
}



exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({message:"Signout Successfully!"})
}


// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET_KEY
// })
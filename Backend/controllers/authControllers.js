const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const expressJwt = require("express-jwt");
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_KEY)
const {errorHandler} =  require( "../helpers/dbErrorHandler")



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
            email: email
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


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    // algorithms: ['RS256']
    algorithms: ['HS256']
})


exports.authMiddleware = (req, res, next) => {
    
    const authUserId = req.user._id;
    User.findById({_id:authUserId}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"USER not Found!"
            })
        }
        req.profile = user
        next();
    })
}


exports.adminMiddleware = (req, res, next) => {
    // console.log(req);
    const authUserId = req.user._id;
    User.findById({_id:authUserId}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"USER not Found!"
            })
        }
        if (user.role !== 1) {
            return res.status(400).json({
                error:"Access Denied!"
            })
        }
        req.profile = user
        next();
    })
}


exports.forgotPassword = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {email} = req.body

    User.findOne({
            email: email
        })
        .exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"User with given Email do not exist. Please Signup!"
                })
            }
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY_RESET_PASSWORD, {expiresIn:"10m"})


            const emailData = {
                to:email,
                from:process.env.EMAIL_FROM,
                subject:`Reset Password Link - ${process.env.APP_NAME}`,
                text:`Email received for Reset Password`,
                html:`
                    <p>Please use following link to reset your Password!</p>
                    <h4>${process.env.CLIENT_URL}/auth/password/reset/${token}</h4>
                    <hr/>
                    <p>This Email may containe sensitive Information!</p>
                    <p>https://seoblog.com</p>
                `
            }

            return user.updateOne({resetPasswordLink:token}, (err, success)=>{
                if (err) {
                    return res.json({error:errorHandler(err)})
                } else {
                    sgMail.send(emailData)
                        .then((res)=>{
                            return res.json({
                                message:`Email has sent to ${email}. Link will Expire in 10 minutes`
                            })
                        })
                }
            })

            
        })
}


exports.resetPassword = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {resetPasswordLink, newPassword} = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_SECRET_KEY_RESET_PASSWORD, function(err, decoded){
            if (err) {
                return res
                        .status(400)
                        .json({error:'Link Expired! Try Again!'})
            }
            User.findOne({resetPasswordLink}).exec((err, user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"Something went wrong. Please Try Again Later!"
                    })
                }
                const updatedFields = {
                    password:newPassword,
                    resetPasswordLink:""
                }
                user = _.extend(user, updatedFields)

                user.save((err, result)=>{
                    if(err || !result){
                        return res.status(400).json({
                            error:"Something went wrong. Please Try Again Later!"
                        })
                    }
                    res.json({
                        message:`Password Updated Successfully!`
                    })
                })
            })
        })
    }


}
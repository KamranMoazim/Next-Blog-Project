const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const shortId = require("shortid");


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
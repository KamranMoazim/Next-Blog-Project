const User = require("../models/userModel")
const Blog = require("../models/blogModel")
const {errorHandler} = require("../helpers/dbErrorHandler")
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")


exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}


exports.publicProfile = (req, res) => {

    let username = req.params.username
    // console.log(username);
    let user;
    User.find({username}).exec((err, userFromDB)=>{
        if (err || !userFromDB) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        user = userFromDB;
        let postedBy = user._id;
        Blog.find(postedBy)
            .populate("categories", "_id name slug")
            .populate("tags", "_id name slug")
            .populate("postedBy", "_id name username")
            .limit(10)
            .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
            .exec((err, data)=>{
                if (err) {
                    return res.json({
                        error:errorHandler(err)
                    })
                }
                // console.log(data);
                res.json({
                    user,
                    blogs:data
                })
            })
    })
}


exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        // console.log(fields);
        if (err) {
            return res.status(400).json({
                error:"Photo could not upload!"
            })
        }
        let user = req.profile
        user = _.extend(user, fields)

        if (fields.password && fields.password.length > 6) {
            return res.status(400).json({
                error:"Password should of be of minimum length 6"
            })
        }

        if (files.photo) {
            if (files.photo.size > 10000000) {  // 1-MB
                return res.status(400).json({
                    error:"Image should be less than 1-MB in size"
                })
            } else {
                console.log(files.photo.size);
                // console.log(files.photo.path);
                // blog.photo.data = fs.readFileSync(files.photo.path) || null;
                blog.photo.data = null;
                blog.photo.contentType = files.photo.type
            }
        }
        user.save((err, result)=>{
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            user.photo = undefined;
            res.json(user)
        })
    })
}


exports.photo = (req, res) => {
    let username = req.params.username
    User.findOne({username})
        .exec((err, user)=>{
            if (err || !user) {
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            if (user.photo.data) {
                res.set("Content-Type", user.photo.contentType)
                return res.send(user.photo.data)
            }
        })
}
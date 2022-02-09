const { validationResult } = require("express-validator");
const slugify = require("slugify")

const Tag = require("../models/tagsModel")
const Blog = require("../models/blogModel")

const {errorHandler} = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();
    let tag = new Tag({name, slug});
    tag.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(data)
    })
}


exports.list = (req, res) => {

    Tag.find({}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(data)
    })
}

exports.read = (req, res) => {

    const slug = req.params.slug.toLowerCase();
    Tag.findOne({slug}).exec((err, tag)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        // res.json(tag)
        Blog.find({tags:tag})
            .populate("categories", "_id name slug")
            .populate("tags", "_id name slug")
            .populate("postedBy", "_id name")
            .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
            .exec((err, data)=>{
                if (err) {
                    return res.json({
                        error:errorHandler(err)
                    })
                }
                res.json({tag:tag, blogs:data})
            })
    })
}


exports.remove = (req, res) => {

    const slug = req.params.slug.toLowerCase();
    Tag.findOneAndRemove({slug}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            message:"Tag Deleted Successfully!"
        })
    })
}

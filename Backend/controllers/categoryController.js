const { validationResult } = require("express-validator");
const slugify = require("slugify")

const Category = require("../models/categoryModel")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    // validating
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();
    let category = new Category({name, slug});
    category.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(data)
    })
}


exports.list = (req, res) => {

    Category.find({}).exec((err, data)=>{
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
    Category.findOne({slug}).exec((err, category)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(category)
    })
}


exports.remove = (req, res) => {

    const slug = req.params.slug.toLowerCase();
    Category.findOneAndRemove({slug}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            message:"Category Deleted Successfully!"
        })
    })
}

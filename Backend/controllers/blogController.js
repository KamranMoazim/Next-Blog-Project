const Blog = require("../models/blogModel")
const Category = require("../models/categoryModel")
const Tag = require("../models/tagsModel")

const slugify = require("slugify")
const {errorHandler} = require("../helpers/dbErrorHandler")
const _ = require("lodash")
const formidable = require("formidable")
const stripHtml = require("string-strip-html")
const fs = require("fs")

const {smartTrim} = require("../helpers/blogHelper")


const { validationResult } = require("express-validator");



exports.createBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if (err) {
            return res.status(400).json({
                error:"Image could not upload!"
            })
        }
        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                error:"Title is required!"
            }) 
        }

        if (!body || !body.length < 200) {
            return res.status(400).json({
                error:"Content is Too short!"
            }) 
        }

        if (!categories || !categories.length === 0) {
            return res.status(400).json({
                error:"At least one Category is Required!"
            }) 
        }

        if (!tags || !tags.length === 0) {
            return res.status(400).json({
                error:"At least one Tag is Required!"
            }) 
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.slug = slugify(title).toLowerCase();
        blog.excerpt = smartTrim(body, 320, " ", "...")
        blog.mtitle = `${title} | ${process.env.APP_NAME}`
        blog.mdesc = stripHtml(body.substring(0, 160))
        blog.postedBy = req.user._id

        let arrayOfCategories = categories && categories.splice(",")
        let arrayOfTags = tags && tags.splice(",")

        if (files.photo) {
            if (files.photo.size > 10000000) {  // 1-MB
                return res.status(400).json({
                    error:"Image should be less than 1-MB in size"
                })
            } else {
                blog.photo.data = fs.readFileSync(files.photo.path)
                blog.photo.contentType = files.photo.type
            }
        }

        blog.save((err, result)=>{
            if (err) {
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            // res.json(result)
            Blog.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new:true}).exec((err, res)=>{
                if (err) {
                    return res.status(400).json({
                        error:errorHandler(err)
                    })
                } else {
                    Blog.findByIdAndUpdate(result._id, {$push: {tags: arrayOfTags}}, {new:true}).exec((err, resInnre)=>{
                        if (err) {
                            return res.status(400).json({
                                error:errorHandler(err)
                            })
                        } else {
                            res.json(resInnre)
                        }
                    })
                }
            })
        })

    })

}



const Blog = require("../models/blogModel")
const Category = require("../models/categoryModel")
const Tag = require("../models/tagsModel")

const slugify = require("slugify")
const {errorHandler} = require("../helpers/dbErrorHandler")
const _ = require("lodash")
const formidable = require("formidable")
// const stripHtml = require("string-strip-html")
const { convert } = require('html-to-text');
const fs = require("fs")

const {smartTrim} = require("../helpers/blogHelper")




exports.createBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        // console.log(fields);
        if (err) {
            return res.status(400).json({
                error:"Image could not upload!"
            })
        }
        const { title, body, categories, tags } = fields;
        // console.log("reached title", title);
        if (!title || !title.length) {
            return res.status(400).json({
                error:"Title is required!"
            }) 
        }
        // console.log("reached body", body);
        if (!body || (body.length < 200)) {
            return res.status(400).json({
                error:"Content is Too short!"
            }) 
        }
        // console.log("reached categories", categories);
        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error:"At least one Category is Required!"
            }) 
        }
        // console.log("reached tags", tags);
        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error:"At least one Tag is Required!"
            }) 
        }
        let blog = new Blog();
        // console.log("reached blog", blog);
        blog.title = title;
        blog.body = body;
        blog.slug = slugify(title).toLowerCase();
        blog.excerpt = smartTrim(body, 320, " ", "...")
        // console.log("reached excerpt", blog.excerpt);
        blog.mtitle = `${title} | ${process.env.APP_NAME}`
        // blog.mtitle = `${title} | 'SEOBLOG'`
        // console.log("reached mtitle", blog.mtitle);
        // blog.mdesc = stripHtml(body.substring(0, 160))
        blog.mdesc = convert(body.substring(0, 160), {
            wordwrap:160
        })
        // console.log("reached mdesc", blog.mdesc);
        blog.postedBy = req.user._id

        // console.log("reached end blog");

        let arrayOfCategories = categories && categories.split(",")
        let arrayOfTags = tags && tags.split(",")
        // console.log("reached tags and cats", arrayOfCategories, arrayOfTags);

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
        console.log("ended files.photos");

        blog.save((err, result)=>{
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            // res.json(result)
            Blog.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new:true}).exec((err, resIn)=>{
                if (err) {
                    return res.status(400).json({
                        error:errorHandler(err)
                    })
                } else {
                    console.log("saved blog");
                    Blog.findByIdAndUpdate(resIn._id, {$push: {tags: arrayOfTags}}, {new:true}).exec((err, resInnre)=>{
                        console.log("saved categories");
                        if (err) {
                            return res.status(400).json({
                                error:errorHandler(err)
                            })
                        } else {
                            console.log("saved tags");
                            res.json(resInnre)
                        }
                    })
                }
            })
        })

    })

}


exports.listBlogs = (req, res) => {
    Blog.find()
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name username")
        .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
        .exec((err, data)=>{
            if (err) {
                return res.json({
                    error:errorHandler(err)
                })
            }
            res.json(data)
        })
}


exports.listBlogsCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs;
    let categories;
    let tags;

    Blog.find()
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name username")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
        .exec((err, data)=>{
            if (err) {
                return res.json({
                    error:errorHandler(err)
                })
            }
            blogs = data;
            Category.find()
                .exec((err, c)=>{
                    if (err) {
                        return res.json({
                            error:errorHandler(err)
                        })
                    }
                    categories = c;
                })
            Tag.find()
                .exec((err, t)=>{
                    if (err) {
                        return res.json({
                            error:errorHandler(err)
                        })
                    }
                    tags = t;
                    res.json({blogs, categories, tags, size:blogs.length})
                })  
        })
}

exports.singleBlog = (req, res) => {
    // const slug = req.params.slug.toLowerCase();
    const slug = req.params.id;
    // console.log(slug);
    Blog.findOne({slug})
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name username")
        .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
        .exec((err, data)=>{
            if (err) {
                return res.json({
                    error:errorHandler(err)
                })
            }
            res.json(data)
        })
}


exports.deleteBlog = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOneAndRemove({slug})
        .exec((err, data)=>{
            if (err) {
                return res.json({
                    error:errorHandler(err)
                })
            }
            res.json({
                message:"Blog deleted Successfully!"
            })
        })
}



exports.updateBlog = (req, res) => {

    const slug = req.params.slug.toLowerCase();

    Blog.findOne({slug})
        .exec((err, oldBlog)=>{
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            let form = new formidable.IncomingForm();
            form.keepExtensions = true;

            form.parse(req, (err, fields, files)=>{
                // console.log(fields);
                if (err) {
                    return res.status(400).json({
                        error:"Image could not upload!"
                    })
                }

                let slugBeforeMerge = oldBlog.slug;
                oldBlog = _.merge(oldBlog, fields);
                oldBlog.slug = slugBeforeMerge;

                const { title, body, categories, tags } = fields;

                if (body) {
                    oldBlog.excerpt = smartTrim(body, 320, ", ", "...")
                    oldBlog.mdesc = convert(body.substring(0, 160), {
                        wordwrap:160
                    })
                }

                if (categories) {
                    oldBlog.categories = categories.split(",")
                }

                if (tags) {
                    oldBlog.tags = tags.split(",")
                }

                if (!title || !title.length) {
                    return res.status(400).json({
                        error:"Title is required!"
                    }) 
                }
        
                if (files.photo) {
                    if (files.photo.size > 10000000) {  // 1-MB
                        return res.status(400).json({
                            error:"Image should be less than 1-MB in size"
                        })
                    } else {
                        oldBlog.photo.data = null;
                        oldBlog.photo.contentType = files.photo.type
                    }
                }
        
                oldBlog.save((err, result)=>{
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            error:errorHandler(err)
                        })
                    }
                    res.json(result)
                })
        
            })
        })
}


exports.showPhoto = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({slug})
        .select("photo")
        .exec((err, blog)=>{
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.set("Content-Type", blog.photo.contentType)
            return res.send(blog.photo.data)
        })
}
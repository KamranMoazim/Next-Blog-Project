const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 160,
        index: true,
    },
    slug: {
        type: String,
        trim: true,
        index: true,
        unique: true,
    },
    body: {
        type: {},  // an empty object of any type like binary, data, string
        required: true,
        min: 200,
        max: 2000000,  // 2MB
    },
    excerpt: {
        type: String,
        max: 1000
    },
    mtitle: {
        type: String,
    },
    mdesc: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    categories: [{type: ObjectId, ref: "Category", required: true}],
    tags: [{type: ObjectId, ref: "Tag", required: true}],
    postedBy: {
        type: ObjectId, 
        ref: "User", 
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);




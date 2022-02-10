const express = require("express");
const router = express.Router();

const { 
    createBlog, listBlogs, listBlogsCategoriesTags, 
    singleBlog, showPhoto, updateBlog, deleteBlog, 
    listRelatedBlogs, listBlogSearch } = require("../controllers/blogController")
const {adminMiddleware, requireSignin, authMiddleware} = require("../controllers/authControllers")

router.post("/blog", requireSignin, adminMiddleware, createBlog);
router.get("/blog", listBlogs);
router.post("/blog-categories-tags", listBlogsCategoriesTags);
router.get("/blog/:id", singleBlog);
router.delete("/blog/:id", requireSignin, adminMiddleware, deleteBlog);
router.put("/blog/:id", requireSignin, adminMiddleware, updateBlog);
router.put("/blog/photo/:id", showPhoto);
router.post("/blog/related", listRelatedBlogs);
router.get("/blogs/search?", listBlogSearch);

// user blog crud
router.post("/user/blog", requireSignin, authMiddleware, createBlog);
router.delete("/user/blog/:id", requireSignin, authMiddleware, deleteBlog);
router.put("/user/blog/:id", requireSignin, authMiddleware, updateBlog);

module.exports = router;
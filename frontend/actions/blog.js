import fetch from "isomorphic-fetch"
import {isAuth, handleResponse} from "../actions/auth"
import {API} from "../config"
import queryString from "query-string"

export const createBlog = (blog, token) => {

    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/blog`
    } else if (isAuth() && isAuth().role === 0) {
        createBlogEndpoint = `${API}/user/blog`
    }


    return fetch(createBlogEndpoint, {
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then((res)=>{
            handleResponse(res)
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        skip, limit
    }
    // console.log(data);
    return fetch(`${API}/blog-categories-tags`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json",
        },
        body: JSON.stringify(data)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const singleBlog = (slug) => {
    // console.log(slug);
    return fetch(`${API}/blog/${slug}`, {
        method:"GET",
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const listRelatedBlogs = (blog) => {

    // console.log(blog);

    return fetch(`${API}/blog/related`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json",
        },
        body: JSON.stringify(blog)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getBlogs = () => {
    return fetch(`${API}/blog`, {
        method:"GET",
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const removeBlog = (slug, token) => {

    let removeBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        removeBlogEndpoint = `${API}/blog/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        removeBlogEndpoint = `${API}/user/blog/${slug}`
    }

    // console.log(slug);
    return fetch(removeBlogEndpoint, {
        method:"DELETE",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res)=>{
            handleResponse(res)
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const updateBlog = (blog, token, slug) => {

    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`
    }

    return fetch(updateBlogEndpoint, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then((res)=>{
            handleResponse(res)
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const listSearchBlogs = (params) => {
    // console.log(params);
    let query = queryString.stringify(params)
    // console.log(query);
    return fetch(`${API}/blogs/search?${query}`, { // 
        method:"GET",
    })
        .then((res)=>{
            console.log(res);
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}





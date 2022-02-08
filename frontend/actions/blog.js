import fetch from "isomorphic-fetch"

import {API} from "../config"



export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getBlogsWithCategoriesAndTags = () => {
    return fetch(`${API}/blog-categories-tags`, {
        method:"GET",
        headers:{
            Accept:"application/json"
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const getBlogs = () => {
    return fetch(`${API}/blogs`, {
        method:"GET",
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const singleBlog = (slug) => {
    return fetch(`${API}/category/${slug}`, {
        method:"GET",
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


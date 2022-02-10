import React from 'react';
import Router from "next/router";
import {useEffect, useState} from "react"
import Link from "next/link";

import {isAuth, getCookie} from "../../actions/auth"
import {getBlogs, removeBlog } from "../../actions/blog"
import moment from "moment"
import renderHtml from "react-render-html"



function BlogRead() {

    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState("")
    const token = getCookie("token")

    useEffect(()=>{
        loadBlogs();
    },[])

    const loadBlogs = () => {
        getBlogs()
            .then((data)=>{
                if (data.error) {
                    console.log(data.error);
                }
                setBlogs(data)
            })
    }

    const deleteBlog = (slug) => {
        removeBlog(slug, token)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            setMessage(data.message)
            loadBlogs()
        })
    }

    const deleteConfirm = (slug) => {
        if (confirm("Are you sure you wants to DELETE this Blog?")) {
            deleteBlog(slug);
        }
    }

    const showUpdateButton = (blog) => {
        if ( isAuth() && isAuth().role === 0 ) {
            return <Link href={`/user/crud/${blog.slug}`}>
                <a className='btn btn-sm btn-warning'>
                    Update
                </a>
            </Link>
        } else if (isAuth() && isAuth().role === 1) {
            return <Link href={`/admin/crud/${blog.slug}`}>
                <a className='ml-2 btn btn-sm btn-warning'>
                    Update
                </a>
            </Link>
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, ind)=>{
            return <div key={ind} className='mt-5'>
                <h3>{blog.title}</h3>
                <p className='mark mt-3 mark'>
                    Written By <Link href={`/profile/${blog.postedBy.username}`}>
                        {blog.postedBy.username}
                    </Link> | Published {moment(blog.updatedAt).fromNow()}
                </p>
                <button className='btn btn-danger btn-sm' onClick={()=>deleteConfirm(blog.slug)}>
                    Delete Blog
                </button>
                {showUpdateButton(blog)}
            </div>
        })
    }

  return <>
        <div className='row'>
            <div className='col-md-12'>
                {message && <div className='alert alert-warning'>{message}</div>}
                {showAllBlogs()}
            </div>
        </div>
  </>;
}

export default BlogRead;



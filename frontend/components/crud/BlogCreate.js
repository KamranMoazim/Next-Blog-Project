import React from 'react';
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react"
import {isAuth, getCookie} from "../../actions/auth"
import {getCategories} from "../../actions/category"
import {getTags} from "../../actions/tag"
import {createBlog} from "../../actions/blog"

import {QuillFormats, QuillModules} from "../../helpers/Quill"

const ReactQuill = dynamic(()=>import("react-quill"), {ssr:false});
import "../../node_modules/react-quill/dist/quill.snow.css"


function BlogCreate({router}) {

  const blogFromLS = () => {   // localStorage
    if (typeof(window) === 'undefined') {
      return false
    } 
    if(localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"))
    } else {
      return false;
    }
  }

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error:"",
    success:"",
    sizeError:"",
    form:"",
    formData:"",
    title:"",
    hidePublishButton:false
  });
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const [checkedCategories, setCheckedCategories] = useState([])
  const [checkedTags, setCheckedTags] = useState([])


  const { error, success, sizeError, form, formData, title, hidePublishButton } = values
  const token = getCookie("token");

  useEffect(()=>{
    setValues({...values, formData: new FormData() });
    initCategories();
    initTags();
  },[router])

  const initCategories = () => {
    getCategories()
      .then((data)=>{
        if (data.error) {
          setValues({...values, error:data.error})
        } else {
          setCategories(data)
        }
      })
  }
  const initTags = () => {
    getTags()
      .then((data)=>{
        if (data.error) {
          setValues({...values, error:data.error})
        } else {
          setTags(data)
        }
      })
  }
 
  const publishBlog = (e) => {
    e.preventDefault();
    // console.log(formData.get("body"));
    createBlog(formData, token)
      .then((data)=>{
        if (data.error) {
          setValues({...values, error:data.error})
        } else {
          setValues({...values, error:"", title:"", success:`A new Blog with title "${data.title}" created!`});
          setBody("")
          setCheckedCategories([])
          setCheckedTags([])
        }
      })
  }

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // console.log(e.target.files);
    formData.set(name, value)
    setValues({...values, [name]:value, formData, error:"" })
  }

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", body);
    // console.log(body);
    if (typeof(window) !== "undefined") {
      localStorage.setItem('blog', JSON.stringify(e))
    }
  }

  const handleToggleCategories = (id) => {
    setValues({...values, error:""})
    // return the first index or -1
    const clickedCategoryTemp = checkedCategories.indexOf(id);
    const all = [...checkedCategories];
    if (clickedCategoryTemp === -1) {
      all.push(id)
    } else {
      all.splice(clickedCategoryTemp, 1)
    }
    console.log(all);
    setCheckedCategories(all);
    formData.set('categories', all);
  }

  const handleToggleTags = (id) => {
    setValues({...values, error:""})
    // return the first index or -1
    const clickedTagsTemp = checkedTags.indexOf(id);
    const all = [...checkedTags];
    if (clickedTagsTemp === -1) {
      all.push(id)
    } else {
      all.splice(clickedTagsTemp, 1)
    }
    console.log(all);
    setCheckedTags(all);
    formData.set('tags', all);
  }

  const showCategories = () => {
    return (
      categories && categories.map((cate, ind)=>{
        return <li key={ind} className='list-unstyled'>
          <input onChange={()=>handleToggleCategories(cate._id)} type="checkbox" className='mr-2' />
          {/*  */}
          <label className='form-check-label'> {cate.name} </label>
        </li>
      })
    )
  }

  const showTags = () => {
    return (
      tags && tags.map((tag, ind)=>{
        return <li key={ind} className='list-unstyled'>
          <input onChange={()=>handleToggleTags(tag._id)} type="checkbox" className='mr-2' />
          <label className='form-check-label'> {tag.name} </label>
        </li>
      })
    )
  }

  const showSuccess = () => (
    <div className='alert alert-success' style={{display: success? "" : "none"}}>
      {success}
    </div>
  )

  const showError = () => (
    <div className='alert alert-danger' style={{display: error? "" : "none"}}>
      {error}
    </div>
  )

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <lable className='text-muted'> Title </lable>
          <input type="text" className='form-control' onChange={handleChange("title")} />
        </div>

        <div className='form-group'>
          <ReactQuill 
            modules={QuillModules} 
            formats={QuillFormats} 
            value={body} 
            placeholder='Write Your Blog here' 
            onChange={handleBody} />
        </div>

        <div>
          <button type="submit" className='btn btn-primary'> Publish Blog </button>
        </div>
      </form>
    )
  }

  return <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <h2>Create a Blog Form</h2>
          {showSuccess()}
          {showError()}
          {createBlogForm()}
        </div>

        <div className='col-md-4'>

          <div>
            <div className='form-group pb-2'>
              <h5>Featured Image</h5>
              <small className='text-muted'> Max Size : 1-MB </small>
              <label className='btn btn-outline-info'>
                Upload Featured Image
                <input onChange={handleChange("photo")} type="file" accept='image/*' hidden />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr/>
            <ul style={{maxHeight:"100px", overflowY:"scroll"}}>
              {showCategories()}
            </ul>
          </div>

          <div>
            <h5>Tags</h5>
            <hr/>
            <ul style={{maxHeight:"100px", overflowY:"scroll"}}>
              {showTags()}
            </ul>
          </div>

        </div>
      </div>  
    </div>;
}

export default withRouter(BlogCreate);

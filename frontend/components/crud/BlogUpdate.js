import React from 'react';
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react"
import {isAuth, getCookie} from "../../actions/auth"
import {getCategories} from "../../actions/category"
import {getTags} from "../../actions/tag"
import {updateBlog, singleBlog} from "../../actions/blog"

import {QuillFormats, QuillModules} from "../../helpers/Quill"
import {DOMAIN} from "../../config"

const ReactQuill = dynamic(()=>import("react-quill"), {ssr:false});
import "../../node_modules/react-quill/dist/quill.snow.css"


function BlogUpdate({router}) {

    const [body, setBody] = useState("");
    const [values, setValues] = useState({
        error:"",
        success:"",
        formData: new FormData(),
        // formData: "",
        title:"",
        body:""
    });
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checkedCategories, setCheckedCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])

    const {error, success, formData, title} = values;

    const token = getCookie("token");

    useEffect(()=>{
        setValues({...values})
        // setValues({...values, formData: new FormData()})
        initBlog();
        initCategories()
        initTags()
    },[router])

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug)
                .then((data)=>{
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        console.log(data);
                        setValues({...values, title:data.title})
                        setBody(data.body)
                        data.categories.map((cate)=>{
                            setCheckedCategories([...checkedCategories, cate._id])
                        })
                        data.tags.map((cate)=>{
                            setCheckedTags([...checkedTags, cate._id])
                        })
                    }
                })
        }
    }

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

    const handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value)
        setValues({...values, [name]:value, formData, error:"" })
      }

    const handleBody = (e) => {
        // console.log(e);
        setBody(e);
        formData.set("body", body);
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


    const editBlog = (e) => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug)
            .then((data)=>{
                if (data.error) {
                    setValues({...values, error:data.error})
                } else {
                    setValues({...values, error:"", title:"", success:`Blog Updated Successfully!`});
                    // setBody("")
                    // setCheckedCategories([])
                    // setCheckedTags([])
                    if (isAuth() && isAuth().role === 1) {
                        Router.replace(`/admin/crud/${router.query.slug}`)
                    } else if (isAuth() && isAuth().role === 0) {
                        Router.replace(`/user/crud/${router.query.slug}`)
                    }
                }
            })
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

    const updateBlogForm = () => {

        return (
          <form onSubmit={editBlog}>
            <div className='form-group'>
              <lable className='text-muted'> Title </lable>
              <input type="text" className='form-control' value={title} onChange={handleChange("title")} />
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
              <button type="submit" className='btn btn-primary'> Update Blog </button>
            </div>
          </form>
        )
    }    

    const checkOutCategories = (id) => {
        const result = checkedCategories.indexOf(id);
        if(result !== -1){
            return true;
        } else {
            return false
        }
    }

    const checkOutTags = (id) => {
        const result = checkedTags.indexOf(id);
        if(result !== -1){
            return true;
        } else {
            return false
        }
    }

    const showCategories = () => {
        return (
          categories && categories.map((cate, ind)=>{
            return <li key={ind} className='list-unstyled'>
              <input 
                onChange={()=>handleToggleCategories(cate._id)} 
                checked={checkOutCategories(cate._id)} 
                type="checkbox" 
                className='mr-2' />
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
              <input 
              onChange={()=>handleToggleTags(tag._id)} 
              checked={checkOutTags(tag._id)}
              type="checkbox" 
              className='mr-2' />
              <label className='form-check-label'> {tag.name} </label>
            </li>
          })
        )
      }

    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <h2>Update Blog Form</h2>
          {showSuccess()}
          {showError()}
          {updateBlogForm()}
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

export default withRouter(BlogUpdate);

import React, {useState, useEffect} from 'react';


import {getCookie} from "../../actions/auth"
import {createTag, getTags, singleTag, deleteTag} from "../../actions/tag"



function Tag() {

    const [values, setValues] = useState({
        name:"",
        error:false,
        success:false,
        tags:[],
        removed: false,
        reload: false,
    })

    const {name, error, success, tags, removed, reload} = values;
    const token = getCookie("token");

    useEffect(()=>{
        loadTags();
    },[reload])

    const loadTags = () => {
        getTags()
            .then((res)=>{
                if (res.error) {
                    console.log(res.error);
                } else {
                    setValues({...values, tags: res})
                }
            })
    }

    const showTags = () => {
        return tags.map((tag, ind)=>{
            return <button key={ind} title='Double Click to DELETE' onDoubleClick={()=>deleteConfirm(tag.slug)} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                {tag.name}
            </button>
        })
    } 

    const deleteConfirm = (tag) => {
        // var answer = alert
        // console.log(answer);
        if (confirm("Are you sure you wants to DELETE this Tag?")) {
            // console.log(tag);
            removeTag(tag);
        }
    }

    const removeTag = (slug) => {
        deleteTag(slug, token)
            .then((data)=>{
                if (data.error) {
                    console.log(data.error);
                } else {
                    // console.log(data);
                    setValues({...values, error:false, success:false, name:"", removed: true, reload:!reload })
                }
            })
    }

    const  showSuccess = () => {
        if (success) {
            return <p className='text-success'> Tags Created! </p>
        }
    }
    const  showError = () => {
        if (error) {
            return <p className='text-danger'> Tags Already Exists! </p>
        }
    }
    const  showRemoved = () => {
        if (removed) {
            return <p className='text-success'> Tags Deleted! </p>
        }
    }

    const mouseMoveHandler = () => {
        setValues({...values, success:false, error:false, removed:""})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        // console.log(name, token);
        createTag({name},token)
            .then((data)=>{
                // console.log(data);
                if (data.error) {
                    setValues({...values, error:data.error, success:false})
                } else {
                    setValues({...values, error:false, success:true, name:"", removed: false, reload:!reload})
                }
            })
    }

    const handleChange = (e) => {
        setValues({...values, name:e.target.value, error:false, success:false, removed: ""})
    }

    const newTagForm = () => {
        return <>
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Name : </label>
                    <input type="text" className='form-control' onChange={handleChange} value={name} required />
                </div>
                <button type='submit' className='btn btn-primary'>
                        Create
                </button>
            </form>
        </>
    }

  return <>
  {showSuccess()}
  {showError()}
  {showRemoved()}
        <div onMouseLeave={mouseMoveHandler}>
            {newTagForm()}
            {showTags()}
        </div>
  </>;
}

export default Tag;

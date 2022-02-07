import React, {useState, useEffect} from 'react';


import {getCookie} from "../../actions/auth"
import {createCategory, getCategories, singleCategory, deleteCategory} from "../../actions/category"



function Category() {

    const [values, setValues] = useState({
        name:"",
        error:false,
        success:false,
        categories:[],
        removed: false,
        reload: false,
    })

    const {name, error, success, categories, removed, reload} = values;
    const token = getCookie("token");

    useEffect(()=>{
        loadCategories();
    },[reload])

    const loadCategories = () => {
        getCategories()
            .then((res)=>{
                if (res.error) {
                    console.log(res.error);
                } else {
                    setValues({...values, categories: res})
                }
            })
    }

    const showCateories = () => {
        return categories.map((cate, ind)=>{
            return <button key={ind} title='Double Click to DELETE' onDoubleClick={()=>deleteConfirm(cate.slug)} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                {cate.name}
            </button>
        })
    } 

    const deleteConfirm = (cate) => {
        // var answer = alert
        // console.log(answer);
        if (confirm("Are you sure you wants to DELETE this Category?")) {
            console.log(cate);
            removeCategory(cate);
        }
    }

    const removeCategory = (slug) => {
        deleteCategory(slug, token)
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
            return <p className='text-success'> Category Created! </p>
        }
    }
    const  showError = () => {
        if (error) {
            return <p className='text-danger'> Category Already Exists! </p>
        }
    }
    const  showRemoved = () => {
        if (removed) {
            return <p className='text-success'> Category Deleted! </p>
        }
    }

    const mouseMoveHandler = () => {
        setValues({...values, success:false, error:false, removed:""})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        // console.log(name, token);
        createCategory({name},token)
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

    const newCategoryForm = () => {
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
            {newCategoryForm()}
            {showCateories()}
        </div>
  </>;
}

export default Category;

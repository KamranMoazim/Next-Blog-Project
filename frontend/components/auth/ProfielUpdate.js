import React, {useEffect, useState} from 'react'
import {getCookie, isAuth, updateUser} from "../../actions/auth"
import {updateProfile, getProfile} from "../../actions/user"
import Link from 'next/link'
import Router from 'next/router'


function ProfielUpdate() {

    const [values, setValues] = useState({
        username:"",
        name:"",
        email:"",
        about:"",
        password:"",
        success:false,
        error:false,
        loading:false,
        photo:"",
        userData:"",
    })

    const token = getCookie("token")

    const {userData, username, name, about, email, password, success, error, loading, photo} = values

    const init = () => {
        getProfile(token)
            .then((data)=>{
                if (data.error) {
                    setValues({...values, error:data.error})
                } else {
                    // console.log(data)
                    setValues({...values, username:data.username, name:data.name, email:data.email, about:data.about, success:false, error:false, loading:false })
                }
            })
    }

    useEffect(()=>{
        init()
    },[])

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success? "" : "none"}}>
          Profile Updated Successfully!
        </div>
      )
    
      const showError = () => (
        <div className='alert alert-danger' style={{display: error? "" : "none"}}>
          {error}
        </div>
      )

      const showLoading = () => (
        <div className="alert alert-info" style={{display: loading? "" : "none"}}>
            Loading...
        </div>
    );

    const handleChange = (name) => e => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        let userFormData = new FormData()
        userFormData.set(name, value)
        setValues({...values, [name]:value, userData: userFormData, error:false, success:false })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, loading:true})
        updateProfile(token, userData)
        .then((data)=>{
          if (data.error) {
            setValues({...values, error:data.error, success:false, loading:false})
          } else {
            updateUser(data, ()=>{
                setValues({...values, error:false, loading:false, success:true,
                    username:data.username, name:data.name, email:data.email, about:data.about
                });
            })
          }
        })
    }

    const profileUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='btn btn-outline-info'> Profiel Photo 
                        <input onChange={handleChange("photo")} type="file" accept='image/*' hidden />
                    </label>
                </div>
                <div className='form-group'>
                    <label className='text-muted'> Username </label>
                    <input onChange={handleChange("username")} type="text" value={username} className='form-control' />
                </div>
                <div className='form-group'>
                    <label className='text-muted'> Name </label>
                    <input onChange={handleChange("name")} type="text" value={name} className='form-control' />
                </div>
                <div className='form-group'>
                    <label className='text-muted'> Email </label>
                    <input onChange={handleChange("email")} type="email" value={email} className='form-control' />
                </div>
                <div className='form-group'>
                    <label className='text-muted'> Password </label>
                    <input onChange={handleChange("password")} type="password" value={password} className='form-control' />
                </div>
                <div className='form-group'>
                    <label className='text-muted'> About </label>
                    <input onChange={handleChange("about")} type="text" value={about} className='form-control' />
                </div>
                <div>
                    <button onClick={handleSubmit} className='btn btn-primary'>
                        Submit
                    </button>
                </div>
            </form>
        )
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-8'>
                {showSuccess()}
                {showError()}
                {showLoading()}
                {profileUpdateForm()}
            </div>
        </div>
    </div>
  )
}

export default ProfielUpdate
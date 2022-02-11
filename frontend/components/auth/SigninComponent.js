import Router from 'next/router';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {signin, authenticate, isAuth} from "../../actions/auth"
import GoogleLoginComponent from '../GoogleLogin';

function SigninComponent() {

    const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading: false,
        message:"",
        showForm: true
    })

    const {email, password, error, loading, message, showForm} = values;

    useEffect(()=>{
        isAuth() && Router.push("/")
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.table({email, password, error, loading, message, showForm});
        setValues({...values, error:false, loading:"Loading..." })
        const user = {email, password};

        signin(user)
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading:false })
            } else {
                // save user token to cookie
                // save user info to localStorage
                // authenticate user
                authenticate(data, ()=>{
                    // Router.push("/")
                    if (isAuth() && isAuth().role === 1) {
                        Router.push("/admin")
                    } else {
                        Router.push("/user")
                    }
                })
            }
        })
    }


    const handleChange = name => (e) => {
        setValues({...values, error:false, [name]:e.target.value})
    }

    const showLoading = () => (loading ? <div className='alert alert-info'> {loading} </div> : "")
    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
    const showMessage = () => (message ? <div className='alert alert-info'> {message} </div> : "")
    const showButton = () => (<button className='btn btn-outline-danger mt-2' onClick={()=>{Router.push("/auth/password/forgot")}}> 
                                    Reset Password
                                </button>)

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input value={email} onChange={handleChange("email")} type="email" className='form-control' placeholder='Type Your Email' />
                </div>
                <div className='form-group'>
                    <input value={password} onChange={handleChange("password")} type="password" className='form-control' placeholder='Type Your Password' />
                </div>
                <div>
                    <button className='btn btn-primary'>
                        Signin
                    </button>
                </div>
            </form>
        )
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            <GoogleLoginComponent />
            {showButton()}
        </>
    )
}

export default SigninComponent;

import React, {useState, useEffect} from 'react';
import Layout from "../../../components/Layout"
import {forgotPassword} from "../../../actions/auth"



function Forgot() {

    const [values, setValues] = useState({
        email:"",
        message:"",
        buttonText:"Reset Password",
        sent:false,
        success:false,
        error:false,
    })

    const { email, message, buttonText, success, error, sent } = values

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, buttonText:"Sending Email..."})
        forgotPassword(email)
            .then((data)=>{
                console.log(data)
                if (data.error) {
                    setValues({...values, error:data.error })
                } else {
                    setValues({...values, email:"", message:"", buttonText:"Email Sent", success:true, error:false});
                }
            })
    }

    const handleChange = (name) => (e) => {
        setValues({...values, [name]:e.target.value, buttonText:"Reset Password", success:false, error:false})
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


    const showForm = () => {
        return (
            <form onSubmit={clickSubmit} className='pb-5'>
                <div className='form-group'>
                    <label className='lead'>Email</label>
                    <input  type="email" onChange={handleChange("email")} className='form-control' value={email} required />
                </div>
                <div>
                    <button className='btn btn-primary'>
                        {buttonText}
                    </button>
                </div>
            </form>
        )
    }

  return (
    <Layout>
        <div className='container'>
            <h2>Reset Password</h2>
            {showSuccess()}
            {showError()}
            {showForm()}
        </div>
    </Layout>
  )
}

export default Forgot
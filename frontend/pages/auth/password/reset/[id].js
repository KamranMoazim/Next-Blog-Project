import React, {useState, useEffect} from 'react';
import Layout from "../../../../components/Layout"
import {withRouter} from "next/router"
import {resetPassword} from "../../../../actions/auth"


function reset({router}) {

    // router.query.id
    const [values, setValues] = useState({
        newPassword:"",
        buttonText:"Reset Password",
        success:false,
        error:false,
    })

    const {newPassword, buttonText, success, error} = values

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, buttonText:"Changing Password..."})
        resetPassword({newPassword, resetPasswordLink:router.query.id })
            .then((data)=>{
                console.log(data)
                if (data.error) {
                    setValues({...values, error:data.error })
                } else {
                    setValues({...values, newPassword:"", buttonText:"Password Changed", success:true, error:false});
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
                    <label className='lead'>New Password</label>
                    <input  type="text" onChange={handleChange("newPassword")} className='form-control' value={newPassword} required />
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
            <h2>Enter New Password</h2>
            {showSuccess()}
            {showError()}
            {showForm()}
        </div>
    </Layout>
  )
}


export default withRouter(reset)
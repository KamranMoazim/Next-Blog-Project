import React, { useState } from 'react'

import {emailContactFrom} from "../actions/form"

function ContactFrom({authorEmail=""}) {

    const [values, setValues] = useState({
        name:"",
        email:"",
        message:"",
        buttonText:"Send Message",
        sent:false,
        success:false,
        error:false,
    })

    const {name, email, message, buttonText, success, error, sent} = values

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, buttonText:"Sending..."})
        emailContactFrom({name, email, message })
            .then((data)=>{
                console.log(data)
                if (data.error) {
                    setValues({...values, error:data.error })
                } else {
                    setValues({...values, name:"", email:"", message:"", buttonText:"Message Sent", success:true, error:false});
                }
            })
    }

    const handleChange = (name) => (e) => {
        setValues({...values, [name]:e.target.value, buttonText:"Send Message", success:false, error:false})
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


    const showContactForm = () => {
        return (
            <form onSubmit={clickSubmit} className='pb-5'>
                <div className='form-group'>
                    <label className='lead'>Message</label>
                    {/* <input  type="text" onChange={handleChange("name")} className='form-control' value={name} required /> */}
                    <textarea type="text" onChange={handleChange("message")} className='form-control' value={message} rows="10" required></textarea>
                </div>
                <div className='form-group'>
                    <label className='lead'>Name</label>
                    <input  type="text" onChange={handleChange("name")} className='form-control' value={name} required />
                </div>
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
    <>
        {showSuccess()}
        {showError()}
        {showContactForm()}
    </>
  )
}

export default ContactFrom
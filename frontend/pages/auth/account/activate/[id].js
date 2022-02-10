import React, {useState, useEffect} from 'react';
import Layout from "../../../../components/Layout"
import {withRouter} from "next/router"
import jwt from "jsonwebtoken"
import {signup} from "../../../../actions/auth"


function activate({router}) {

    // router.query.id
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        buttonText:"Activate Account",
        success:false,
        error:false,
    })

    const {name, email, password, buttonText, success, error} = values

    useEffect(()=>{
        let token = router.query.id;
        if (token) {
            const {name, email, password} = jwt.decode(token);
            setValues({...values, name, email, password, success:false, error:false});
        } else {
            setValues({...values, success:false, error:"Link has expired!"});
        }
    },[])

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, buttonText:"Activating Account..."})
        signup({name, email, password})
            .then((data)=>{
                console.log(data)
                if (data.error) {
                    setValues({...values, error:data.error })
                } else {
                    setValues({...values, buttonText:"Account Activated Successfully!", success:true, error:false});
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


    const showForm = () => {
        return (
            <form onSubmit={clickSubmit} className='pb-5'>
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
            <h2>Account Activation</h2>
            {showSuccess()}
            {showError()}
            {showForm()}
        </div>
    </Layout>
  )
}


export default withRouter(activate)
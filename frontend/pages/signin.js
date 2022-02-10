import React from 'react';
import {withRouter} from "next/router"
import Layout from "../components/Layout"
import SigninComponent from "../components/auth/SigninComponent"

function Signin({router}) {

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className='alert alert-danger'>
                {router.query.message}
            </div>
        } else {
            return;
        }
    } 

  return <Layout>
            <h2 className='text-center pt-4 pb-4'>
                Signin Page
            </h2>
            <div className='row'>
                {showRedirectMessage()}
            </div>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <SigninComponent />
                </div>
            </div>
    </Layout>;
}

export default withRouter(Signin);
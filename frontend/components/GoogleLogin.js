import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import GoogleLogin from 'react-google-login'
import {googleSignin, authenticate, isAuth} from "../actions/auth" 
import {GOOGLE_CLIENT_ID} from "../config"

function GoogleLoginComponent() {

    const googleResponse = (response) => {
        const tokenId = response.tokenId;
        const {user} = tokenId;
        googleSignin(user)
            .then((data)=>{
                if (data.error) {
                    console.log(data.error)
                } else {
                    authenticate(data, ()=>{
                        if (isAuth() && isAuth().role === 1) {
                            Router.push("/admin")
                        } else {
                            Router.push("/user")
                        }
                    })
                }
            })
    }

  return (
    <div className='pb-3'>
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText='Login with Google'
            onSuccess={googleResponse}
            onFailure={googleResponse}
            cookiePolicy={'single-host-origin'}
            theme="dark"
        />
    </div>
  )
}

export default GoogleLoginComponent
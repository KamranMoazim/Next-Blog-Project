import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"


export const handleResponse = (response) => {
    if (response.status === 401) {
        removeCookie("token")
        removeLocalStorage("user")
        Router.push({
            pathname:"/singin",
            query:{
                message:"Your session is expired. Please Signin!"
            }
        })
    }
}

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const accountActivationSignup = (user) => {
    return fetch(`${API}/account-activation-signup`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const googleSignin = (user) => {
    return fetch(`${API}/google-signin`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const signout = (next) => {
    removeCookie("token");
    removeLocalStorage("user")    
    next();

    return fetch(`${API}/signout`, {
        method:"GET"
    })
        .then((res)=>{
            console.log("Signout success");
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}



// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// remove cookie
export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get cookie
export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key)
    }
}



// localStorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}


// authenticate user by pass data to cookie and localStorage

export const authenticate = (data, next) => {
    console.log("authentiate");
    setCookie("token", data.token);
    setLocalStorage("user", data.user);
    next();
}


export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie("token")
        if (cookieChecked) {
            if (localStorage.getItem("user")) {
                return JSON.parse(localStorage.getItem("user"))
            } else {
                return false
            }
        }
    }
}


export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem("user")) {
            let auth = JSON.parse(localStorage.getItem("user"))
            user = auth;
            localStorage.setItem("user", JSON.stringify(auth));
            next()
        }
    }
}


export const forgotPassword = (email) => {
    return fetch(`${API}/forgot-password`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({email})
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const resetPassword = (resetInfo) => {
    return fetch(`${API}/reset-password`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify(resetInfo)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}
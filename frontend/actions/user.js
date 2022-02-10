import fetch from "isomorphic-fetch"

import {API} from "../config"

export const userPublicProfile = (username) => {
    // console.log(username);
    return fetch(`${API}/profile/${username}`, {
        method:"GET",
        headers:{
            Accept:"application/json"
        }
    })
        .then((res)=>{
            // console.log(res);
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const getProfile = (token) => {
    // console.log(username);
    return fetch(`${API}/profile`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res)=>{
            // console.log(res);
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const updateProfile = (token, user) => {
    return fetch(`${API}/profile/update`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:user
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}
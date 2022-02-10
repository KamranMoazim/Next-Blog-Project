import fetch from "isomorphic-fetch"
import {isAuth, handleResponse} from "../actions/auth"
import {API} from "../config"
import queryString from "query-string"

export const emailContactFrom = (data) => {

    let emailEndpoint;

    if (data.authorEmail) {
        emailEndpoint = `${API}/contact-blog-author`
    } else if (isAuth() && isAuth().role === 0) {
        emailEndpoint = `${API}/contact`
    }

    return fetch(emailEndpoint, {
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json",
        },
        body: JSON.stringify(data)
    })
        .then((res)=>{
            handleResponse(res)
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}
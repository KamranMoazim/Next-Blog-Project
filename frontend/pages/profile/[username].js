import React, {useEffect, useState} from 'react';
import Head from "next/head"
import {withRouter} from "next/router"

import Link from "next/link"
import moment from "moment"
import Layout from "../../components/Layout"
import {userPublicProfile} from "../../actions/user"
import ContactFrom from '../../components/ContactFrom';


const UserProfile = ({user, blogs}) => {

    const showUserBlogs = (blogs) => {
        return blogs.map((blog, ind)=>{
            return (<div className='mb-4 mt-4' key={ind}>
                <Link href={`/blogs/${blog.slug}`}>
                    <a className='lead'> {blog.title} </a>
                </Link>
            </div>)
        })
    }
    // console.log(user);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h5>{user.name}</h5>
                                        <Link href={`${user.profile}`}>
                                            <a>View Profile</a>
                                        </Link>
                                        <p className='text-muted'>Joined {moment(user.createdAt).fromNow()}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <img 
                                            src='' 
                                            className='img img-fluid img-thumbnail mb-3'
                                            style={{maxHeight:"auto", maxWidth:"100%"}}
                                            alt='user alt' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <br/>
            <div className='container pb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title bg-primary pt-4 pb-4 pr-4 pl-4 text-white'>
                                    Recent Blogs By {user.name}
                                </h5>
                                <br/>
                                {showUserBlogs(blogs)}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title bg-primary pt-4 pb-4 pr-4 pl-4 text-white'>
                                    Message {user.name}
                                </h5>
                                <br/>
                                <ContactFrom authorEmail={user.email} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

UserProfile.getInitialProps = ({query}) => {

    return userPublicProfile(query.username)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            // console.log(data);
            return {
                user: data.user[0],
                blogs: data.blogs
            }
        })
}


export default UserProfile
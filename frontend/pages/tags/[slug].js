import React, {useEffect, useState} from 'react';
import Head from "next/head"
import {withRouter} from "next/router"

import Link from "next/link"
import moment from "moment"
import renderHtml from "react-render-html"

import Layout from "../../components/Layout"
import {singleTag} from "../../actions/tag"
import {API, APP_NAME, DOMAIN} from "../../config"
import Card from '../../components/blog/Card';


const Tag = ({tag, blogs}) => {

    return (
        <>
            <Layout>
                <main>
                    <div className='container-fluid text-center'>
                        <header>
                            <div className='col-md-12 pt-3'>
                                <h1 className='display-4 font-weight-bold' style={{color:"#6257c9"}}>
                                    {tag.name}
                                </h1>
                                {blogs.map((blog, ind)=>{
                                    return <div  key={ind}>
                                        <Card blog={blog} />
                                        <hr/>
                                    </div>
                                })}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </>
    )
}

Tag.getInitialProps = ({query}) => {
    return singleTag(query.slug)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            } else {
                return {
                    tag : data.tag,
                    blogs: data.blogs
                }
            }
        })
}


export default Tag;
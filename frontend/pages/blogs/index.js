import React, {useState} from 'react';
import Head from "next/head"
import Link from "next/link"
import { withRouter } from 'next/router';
import moment from "moment"
import renderHtml from "react-render-html"

import Layout from "../../components/Layout"
import {getBlogsWithCategoriesAndTags} from "../../actions/blog"
import {API, APP_NAME, DOMAIN} from "../../config"
import Card from "../../components/blog/Card"


function Blogs({blogs, categories, tags, size, router}) {

    const head = () => {
        return <Head>
            <title>
                Programming Blogs | {APP_NAME}
            </title>
            <meta name='description' content='Programming blogs and tutorials on React, Node, Vue, Laravel and web development'
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            
            <meta property='og:title' content={`Programming Blogs | ${APP_NAME}`} />
            <meta property='og:description' content='Programming blogs and tutorials on React, Node, Vue, Laravel and web development' />
            <meta property='og:type' content={`website`} />
            <meta property='og:url' content={`${APP_NAME}`} />
            <meta property='og:site_name' content={`${APP_NAME}`} />
            <meta property='og:image' content={`${APP_NAME}`} />
            <meta property='og:image:secure_url' content={`${APP_NAME}`} />
            <meta property='og:image:type' content={`${APP_NAME}`} />
            <meta property='fb:app_id' content={`${APP_NAME}`} />



        </Head>
    }

    const showAllBlogs = () => {
        return blogs.map((blog, ind)=>{
            return <article key={ind}>
                <Card blog={blog} />
                <hr />
            </article>
        })
    }

    const showAllCategories = () => {
        return categories.map((cate, ind)=>{
            return <Link key={ind} href={`/categories/${cate.slug}`}>
                <a className='btn btn-primary mr-1 ml-1 mt-3'>
                    {cate.name}
                </a>
            </Link>
        })
    }

    const showAllTags = () => {
        return tags.map((tag, ind)=>{
            return <Link key={ind} href={`/categories/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                    {tag.name}
                </a>
            </Link>
        })
    }

  return <>
    <Layout>
        <main>
            <div className='container-fluid'>
                <header>
                    <div className='col-md-12 pt-3'>
                        <h1 className='display-4 font-weight-bold text-center'>
                            Programming Blogs and Tutorials
                        </h1>
                    </div>
                    <section>
                        <div className='pb-5 text-center'>
                            {showAllCategories(categories)}
                            <br/>
                            {showAllTags(tags)}
                        </div>
                    </section>
                </header>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        {showAllBlogs()}
                    </div>
                </div>
            </div>
        </main>
    </Layout>
  </>;
}


Blogs.getInitialProps = () => {
    return getBlogsWithCategoriesAndTags()
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size,
            }
        })
}

export default withRouter(Blogs);
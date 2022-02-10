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


function Blogs({blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router}) {

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip+limit;
        getBlogsWithCategoriesAndTags(toSkip, limit)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (size>0 && size >= limit && (<button onClick={loadMore} className='btn btn-primary btn-lg'>Load More</button>))
    }

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

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, ind)=>{
            return <article key={ind}>
                <Card blog={blog} />
                <hr />
            </article>
        })
    }

    const showAllCategories = (categories) => {
        return categories.map((cate, ind)=>{
            return <Link key={ind} href={`/categories/${cate.slug}`}>
                <a className='btn btn-primary mr-1 ml-1 mt-3'>
                    {cate.name}
                </a>
            </Link>
        })
    }

    const showAllTags = (tags) => {
        return tags.map((tag, ind)=>{
            return <Link key={ind} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                    {tag.name}
                </a>
            </Link>
        })
    }

  return <>
    <Layout>
        {head()}
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
                {showAllBlogs()}
            </div>
            <div className='container-fluid'>
                {showLoadedBlogs()}
            </div>
            <div className='text-center pt-5 pb-5'>
                {loadMoreButton()}
            </div>
        </main>
    </Layout>
  </>;
}


Blogs.getInitialProps = () => {

    let skip = 0;
    let limit = 2;

    return getBlogsWithCategoriesAndTags(skip, limit)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip: skip,
            }
        })
}

export default withRouter(Blogs);
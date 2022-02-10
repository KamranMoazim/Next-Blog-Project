import React, {useEffect, useState} from 'react';
import Head from "next/head"
import {withRouter} from "next/router"
import Disqus from "disqus-react"

import Link from "next/link"
import moment from "moment"
import renderHtml from "react-render-html"

import Layout from "../../components/Layout"
import {singleBlog, listRelatedBlogs} from "../../actions/blog"
import {API, APP_NAME, DOMAIN, DISQUS_SHORTNAME} from "../../config"
import SmallCard from '../../components/blog/SmallCard';


function SingleBlog({blog, router}) {

    const [relatedBlogs, setRealtedBlogs] = useState([]);

    const loadRelatedBlogs = (blog) => {
        listRelatedBlogs(blog)
            .then((data)=>{
                if (data.error) {
                    console.log(data.error);
                }
                setRealtedBlogs(data)
            })
    }

    useEffect(()=>{
        loadRelatedBlogs(blog)
    },[])

    const showRelatedBlogs = () => {
        return relatedBlogs.map((rblog, ind)=>{
            return <div key={ind} className='col-md-4'>
                <article>
                    <SmallCard blog={rblog} />
                </article>
            </div>
        })
    }

    const head = () => {
        return <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name='description' content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}`} />
            
            <meta property='og:title' content={`${blog.title} | ${APP_NAME}`} />
            <meta property='og:description' content={blog.mdesc} />
            <meta property='og:url' content={`${DOMAIN}/blogs/${router.pathname}`} />
            <meta property='og:site_name' content={`${APP_NAME}`} />

            <meta property='og:image' content={`${API}/blogs/${blog.photo}`} />
            <meta property='og:image:secure_url' content={`${APP_NAME}`} />
            <meta property='og:image:type' content={`${APP_NAME}`} />
            <meta property='fb:app_id' content={`${APP_NAME}`} />
        </Head>
    }


    const showAllCategories = () => {
        return blog.categories.map((cate, ind)=>{
            return <Link key={ind} href={`/categories/${cate.slug}`}>
                <a className='btn btn-primary mr-1 ml-1 mt-3'>
                    {cate.name}
                </a>
            </Link>
        })
    }

    const showAllTags = () => {
        return blog.tags.map((tag, ind)=>{
            return <Link key={ind} href={`/categories/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                    {tag.name}
                </a>
            </Link>
        })
    }

    const disqusShortname = DISQUS_SHORTNAME
    const disqusConfig = {
      url: DOMAIN,
      identifier: blog._id,
      title: blog.title
    }

  return <>
  {head()}
    <Layout>
        <main>
            <article>
                <div className='container-fluid '>
                    <section>
                        <div className='row' style={{marginTop:'-30px'}}>
                            <img alt={blog.title} className='img img-fluid featured-image' />
                        </div>
                    </section>
                    <section>
                        <div className='container'>
                            <h1 className='display-2 pt-3 pb-3 text-center font-weight-bold'>
                                {blog.title}
                            </h1>
                            <p className='mark mt-3 mark'>
                                Written By <Link href={`/profile/${blog.postedBy.username}`}>
                                    {blog.postedBy.username}
                                </Link> | Published {moment(blog.updatedAt).fromNow()}
                            </p>
                            <div className='pb-3'>
                                {showAllCategories()}
                                {showAllTags()}
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </section>
                    <div className='container'>
                        <section className='col-md-12 lead'>
                            {renderHtml(blog.excerpt)}
                        </section>
                    </div>
                    <div className='container pb-5'>
                        <h4 className='text-center pt-5 pb-5 h2'>Related Blogs</h4>
                        <div className='row'>
                            {showRelatedBlogs()}
                        </div>
                    </div>
                    <div className='container pb-5'>
                        <h4 className='text-center pt-5 pb-5 h2'>
                        </h4>
                            <Disqus.DiscussionEmbed
                                shortname={disqusShortname}
                                config={disqusConfig}
                            />
                    </div>
                </div>
            </article>
        </main>
    </Layout>
  </>;
}


SingleBlog.getInitialProps = ({query}) => {

    // console.log();

    return singleBlog(query.slug)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            return {
                blog: data
            }
        })
}

export default withRouter(SingleBlog);
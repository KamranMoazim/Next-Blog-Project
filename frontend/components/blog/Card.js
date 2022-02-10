import React from 'react';
import Link from "next/link"
import moment from "moment"
import renderHtml from "react-render-html"


function Card({blog}) {

    const showBlogCategories = (blog) => {
        return blog.categories.map((cate, ind)=>{
            return <Link key={ind} href={`/categories/${cate.slug}`}>
                    <a className='btn btn-primary mr-1 ml-1 mt-3'>
                        {cate.name}
                    </a>
                </Link>
        })
    }

    const showBlogTags = (blog) => {
        return blog.tags.map((tag, ind)=>{
            return <Link key={ind} href={`/tags/${tag.slug}`}>
                    <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                        {tag.name}
                    </a>
                </Link>
        })
    }


  return (
    <div className='lead pb-4'>
        <header>
            <Link href={`/blogs/${blog.slug}`}>
                <a>
                    <h2 className='display-4 pb-3 pt-3 font-weight-bold'>
                        {blog.title}
                    </h2>
                </a>
            </Link>
        </header>
        <section>
            <p className='mark ml-1 pt-2 pb-2'>
                Written By <Link href={`/profile/${blog.postedBy.username}`}>
                    {blog.postedBy.username}
                </Link> | Published {moment(blog.updatedAt).fromNow()}
            </p>
        </section>
        <section>
            {showBlogCategories(blog)}
            {showBlogTags(blog)}
            <br/>
            <br/>
        </section>
        <div className='row'>
            <div className='col-md-4'>
                image
            </div>
            <div className='col-md-8'>
                <section>
                    <div className='pb-3'>
                        {renderHtml(blog.excerpt)}
                    </div>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className='btn btn-primary pt-2'>
                            Read More...
                        </a>
                    </Link>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Card;

import React from 'react';
import Link from 'next/link';
import moment from "moment"
import renderHtml from "react-render-html"


function SmallCard({blog}) {

  return (
    <div className='card'>
        <section>
            <Link href={`/blogs/${blog.slug}`}>
                <a>
                    <img className='img img-fluid' style={{maxHeight:"auto", width:"100%"}} alt={blog.title} />
                </a>
            </Link>
        </section>
        <div className='card-body'>
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h5>
                            {blog.title}
                        </h5>
                    </a>
                </Link>
                <p className='card-text'>
                    {renderHtml(blog.excerpt)}
                </p>
            </section>
        </div>
        <div className='card-body'>
            Posted {moment(blog.updatedAt).fromNow()} | By 
            {/* <Link href={`/blogs/${blog.slug}`}>
                <a className='float-right'>
                    {blog.postedBy.username}
                </a>
            </Link> */}
            <Link href={`/profile/${blog.postedBy.username}`}>
                    {blog.postedBy.username}
            </Link>
        </div>
    </div>
  )
}

export default SmallCard;

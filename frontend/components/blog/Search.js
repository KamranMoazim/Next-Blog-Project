import React,{useState, useEffect} from 'react';
import renderHtml from "react-render-html"
import Link from 'next/link';
import {listSearchBlogs} from "../../actions/blog"


function Search() {

    const [values, setValues] = useState({
        search:undefined,
        results:[],
        searched:false,
        message:""
    })

    const {search, results, searched, message} = values

    const handleCahnge = (e) => {
        setValues({...values, search:e.target.value, searched:false, results:[]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        listSearchBlogs({search})
            .then((data)=>{
                // console.log(data);
                setValues({...values, results:data, message:`${data?.length} Blogs Found!`, searched:true})
            })
    }

    const searchedBlogs = (results=[]) => {
        return (
            <div className='jumbotron bg-white'>
                {message && <p className='text-muted font-italic mt-4 pt-4'>{message}</p>}
                {results?.map((blog, ind)=>{
                    return <div key={ind} >
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className='text-primary'>
                                    {blog.title}
                                </a>
                            </Link>
                        </div>
                })}
            </div>
        )
    }

    const searchForm = () => {
        return <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-8'>
                    <input type="search" className='form-control' placeholder='Seacrh Blogs' onChange={handleCahnge} />
                </div>
                <div className='col-md-4'>
                    <button type="submit" className='btn btn-block btn-outline-primary'>
                        Search
                    </button>
                </div>
            </div>
        </form>
    }

  return <div className='container-fluid'>
      <div className='pt-3 pb-3'>
            {searchForm()}
      </div>
      {searched && <div style={{marginTop:"-120px", marginBottom:"-80px"}}>
            {searchedBlogs(results)}
          </div>}
  </div>;
}

export default Search;

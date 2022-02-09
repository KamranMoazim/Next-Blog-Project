import React from 'react';
import Link from 'next/link';

import Layout from "../../../components/Layout"
import Admin from "../../../components/auth/Admin"
import BlogUpdate from '../../../components/crud/BlogUpdate';


function AdminIndex({blog}) {
  return <Layout>
    <Admin>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h1>Update Blog</h1>
          </div>
          <div className='col-md-12'>
            <BlogUpdate blog={blog} />
          </div>
        </div>
      </div>
    </Admin>
  </Layout>;
}



export default AdminIndex;

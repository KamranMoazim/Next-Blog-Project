import React from 'react';
import Link from 'next/link';

import Layout from "../../../components/Layout"
import Admin from "../../../components/auth/Admin"
import BlogRead from '../../../components/crud/BlogRead';


function AdminIndex() {
  return <Layout>
    <Admin>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h1>Manage Blogs</h1>
          </div>
          <div className='col-md-12'>
            <BlogRead />
          </div>
        </div>
      </div>
    </Admin>
  </Layout>;
}

export default AdminIndex;

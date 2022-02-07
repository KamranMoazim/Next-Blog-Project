import React from 'react';
import Link from 'next/link';

import Layout from "../../../components/Layout"
import Admin from "../../../components/auth/Admin"
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';


function AdminIndex() {
  return <Layout>
    <Admin>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h1>Manage Categories and Tags</h1>
          </div>
          <div className='col-md-6'>
            {/* <p>categories</p> */}
            <h2>Categories</h2>
            <Category />
          </div>
          <div className='col-md-6'>
            {/* <p>tags</p> */}
            <h2>Tags</h2>
            <Tag />
          </div>
        </div>
      </div>
    </Admin>
  </Layout>;
}

export default AdminIndex;

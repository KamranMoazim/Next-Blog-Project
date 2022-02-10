import React from 'react';
import Link from 'next/link';

import Layout from "../../components/Layout"
import Private from "../../components/auth/Private"


function UserIndex() {
  return <Layout>
      <Private>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h1>USER DASHBOARD</h1>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link href="/user/crud/blog">
                  Create Blog
                </Link>
              </li>
              <li className='list-group-item'>
                <Link href="/user/crud/blogs">
                  Delete/Update Blogs
                </Link>
              </li>
              <li className='list-group-item'>
                <Link href="/profile/update">
                  Update Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-md-8'>

          </div>
        </div>
      </div>
      </Private>
  </Layout>;
}

export default UserIndex;

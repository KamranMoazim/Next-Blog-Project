import React from 'react';
import Link from 'next/link';

import Layout from "../../components/Layout"
import Admin from "../../components/auth/Admin"


function AdminIndex() {
  return <Layout>
    <Admin>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h1>Admin DASHBOARD</h1>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link href="/admin/crud/category-tag">
                  Create Category
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-md-8'></div>
        </div>
      </div>
    </Admin>
  </Layout>;
}

export default AdminIndex;

import React from 'react'

import Layout from "../../components/Layout"
import Private from "../../components/auth/Private"
import ProfielUpdate from "../../components/auth/ProfielUpdate"


function UserProfielUpdate() {
  return (
    <Layout>
        <Private>
            <div className='container-fluid'>
                <div className='row'>
                    <ProfielUpdate />
                </div>
            </div>
        </Private>
    </Layout>
  )
}

export default UserProfielUpdate
import React from 'react';
import Layout from "../components/Layout"
import ContactFrom from "../components/ContactFrom"



function contact() {
  return (
    <Layout>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <h2>
                        Contact Form
                    </h2>
                    <hr/>
                    <ContactFrom />
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default contact
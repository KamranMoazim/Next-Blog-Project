import React from 'react';
import Link from 'next/link';

import Layout from "../components/Layout"


function index() {
  return <Layout>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
  </Layout>;
}

export default index;

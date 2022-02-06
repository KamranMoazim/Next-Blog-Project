import React from 'react';

import Header from './Header.js';

function Layout({children}) {
  return <>
    <Header />
    {children}
    {/* <p>Footer</p> */}
  </>;
}

export default Layout;

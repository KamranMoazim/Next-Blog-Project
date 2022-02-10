import React from 'react';
import {Navbar, 
        NavbarBrand, 
        NavbarToggler, 
        Nav, 
        Collapse, 
        NavItem, 
        NavLink} from "reactstrap";
import NProgress from "nprogress";
import Link from 'next/link';
import Router from 'next/router';

import {APP_NAME} from "../config.js"
import {signout, isAuth} from "../actions/auth"
import Search from "./blog/Search"


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


function Header() {
  return <>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <Link href="/" forwardRef>
                    <NavbarBrand className='font-weight-bold'>
                        {APP_NAME}
                    </NavbarBrand>
                </Link>
                
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                <Nav
                    className="ml-auto"
                    navbar
                >
                    <NavItem>
                            <Link href="/blogs">
                                <NavLink>
                                    {`BLOGS`}
                                </NavLink>
                            </Link>
                    </NavItem>

                    <NavItem>
                            <Link href="/contact">
                                <NavLink>
                                    {`Contact Form`}
                                </NavLink>
                            </Link>
                    </NavItem>

                    {isAuth() && isAuth().role === 0 && (
                        <NavItem>
                            <Link href="/user">
                                <NavLink>
                                    {`${isAuth().name}'s DASHBOARD`}
                                </NavLink>
                            </Link>
                        </NavItem>
                    )} 

                    {isAuth() && isAuth().role === 1 && (
                        <NavItem>
                            <Link href="/admin">
                                <NavLink>
                                    {`${isAuth().name}'s DASHBOARD`}
                                </NavLink>
                            </Link>
                        </NavItem>
                    )} 

                    {!(isAuth()) && (<><Link href="/signup" forwardRef>
                        <NavItem>
                            <NavLink style={{cursor:"pointer"}}>
                                Signup
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link href="/signin" forwardRef>
                        <NavItem>
                            <NavLink style={{cursor:"pointer"}}>
                                Signin
                            </NavLink>
                        </NavItem>
                    </Link></>)}

                    {isAuth() && (
                        <NavItem>
                            <NavLink style={{cursor:"pointer"}} onClick={()=>signout(()=>Router.replace("/signin"))}>
                                Signout
                            </NavLink>
                        </NavItem>
                    )}
                    <NavItem>
                        <NavLink className='btn btn-primary' style={{cursor:"pointer", color:"white"}} onClick={()=>{
                            if (!isAuth()) {
                                Router.replace("/signin")
                            } else if (isAuth() && isAuth().role === 0) {
                                Router.replace("/user/crud/blog")
                            } else if (isAuth() && isAuth().role === 1) {
                                Router.replace("/admin/crud/blog")
                            }
                        }}>
                            Write a Blog
                        </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            <Search />
        </>;
}

export default Header;

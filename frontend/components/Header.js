import React from 'react';
import {Navbar, 
        NavbarBrand, 
        NavbarToggler, 
        Nav, 
        Collapse, 
        NavItem, 
        NavLink, 
        DropdownToggle, 
        UncontrolledDropdown, 
        DropdownItem, 
        NavbarText, 
        DropdownMenu} from "reactstrap";
        
import Link from 'next/link';
import Router from 'next/router';

import {APP_NAME} from "../config.js"
import {signout, isAuth} from "../actions/auth"

function Header() {
  return <div>
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
                </Nav>
                </Collapse>
            </Navbar>
        </div>;
}

export default Header;

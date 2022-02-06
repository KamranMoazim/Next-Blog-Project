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

import {APP_NAME} from "../config.js"

function Header() {
  return <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <Link href="/">
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
                    <Link href="/signup">
                        <NavItem>
                            <NavLink>
                                Signup
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link href="/signin">
                        <NavItem>
                            <NavLink>
                                Signin
                            </NavLink>
                        </NavItem>
                    </Link>
                </Nav>
                </Collapse>
            </Navbar>
        </div>;
}

export default Header;

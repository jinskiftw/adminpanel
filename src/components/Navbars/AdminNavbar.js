/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Link,  useLocation, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { logoutAction } from "redux/action/auth";



const AdminNavbar = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const allUserData = useSelector((state) => state?.auth?.userData);

 

  const [searchKey, setSearchKey] = React.useState('');

  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    dispatch(logoutAction());
    navigate("/auth/login");
  }

  const handleSearch = () => {
    // Your search logic here
    console.log('Searching for:', searchKey);
     // Update the URL with the searchKey
     const newSearch =   `?search=${encodeURIComponent(searchKey)}` ;
     navigate(newSearch,  { replace: true });
    
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchKey = queryParams.get('search') || '';

  React.useEffect(() => {
    setSearchKey(initialSearchKey);
  }, [initialSearchKey]);
  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <div className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" onClick={handleSearch}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" value={searchKey} onChange={(e)=>{ setSearchKey(e.target.value)}} onKeyPress={handleEnterKeyPress} />
              </InputGroup>
            </FormGroup>
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold white-text">
                      {allUserData[0]?.userName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
              
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span onClick={handleLogOut}>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;

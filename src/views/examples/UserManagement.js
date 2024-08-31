import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, getAllUser, updateUserStatus } from "../../redux/action/auth"
import { handleApiCall } from '../../utils/apiUtils'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



const UserManagement = () => {

  const options =(deleteCallback,...parameters)=>(  {
    title: 'Confirmation !',
    message: 'Do you want to delete this user ?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => deleteCallback(...parameters)
      },
      {
        label: 'No',
      
      }
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  });


  const [open, setOpen] = useState(false)
  const [searchKey, setSearchKey] = React.useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUserData = useSelector((state) => state?.auth?.alluserData?.data);
  console.log(allUserData,"alluserDatta");

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchKey = queryParams.get('search') || '';


    
  const [sorting, setSorting] = useState({model:{ascending:null} });


  const applySorting = (key, ascending) => {
    setSorting(prevSorting => ({
   
      [key]: { ascending }
    }));
  };


  useEffect(() => {
    
    setSearchKey(initialSearchKey);
  }, [initialSearchKey]);

  useEffect(() => {
    console.log("SearchKey=>", searchKey)
    
    dispatch(getAllUser(initialSearchKey,sorting));
  }, [dispatch,searchKey,sorting]);


  const handleuserDelete = async (id) => {
    try {
      const success = await handleApiCall(dispatch, deleteUser(id));
      if (success) {
        dispatch(getAllUser(searchKey));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newUserAdd = async (value) => {
    try {
      const success = await handleApiCall(dispatch, addUser(value));
      if (success) {
        setOpen(false)
        dispatch(getAllUser(searchKey));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name Required"),
    email: Yup.string().email("Invalid email address").required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleCheckboxChange = async (id, status) => {
    const updateStatus = {
      isVerified: !status
    }
    try {
      const success = await handleApiCall(dispatch, updateUserStatus(id, updateStatus));
      if (success) {
        setOpen(false)
        dispatch(getAllUser(searchKey));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <UserHeader />
      <Container className="mt--8" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">User Management {initialSearchKey}</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={() => setOpen(!open)}
                      size="sm"
                    >
                      Add New User
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Modal className="modal-dialog-centered" isOpen={open}>
                <div className="modal-header bg-secondary">
                  <h3 className="modal-title" id="exampleModalLabel">
                    Add New User
                  </h3>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body bg-secondary">
                  <Formik
                    initialValues={{ fullName: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      newUserAdd(values);
                      setSubmitting(false);
                    }}
                  >
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </Modal>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" role="button"   onClick={() => applySorting('fullName', !sorting.fullName?.ascending)}>user name  {(sorting.fullName?.ascending===true)?'▲':(sorting.fullName?.ascending===false)?'▼':'▲▼'} </th>
                    <th scope="col" role="button"   onClick={() => applySorting('email', !sorting.email?.ascending)}>email   {(sorting.email?.ascending===true)?'▲':(sorting.email?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col"  role="button"   onClick={() => applySorting('createdAt', !sorting.createdAt?.ascending)}>join date   {(sorting.createdAt?.ascending===true)?'▲':(sorting.createdAt?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col"  role="button"   onClick={() => applySorting('countCar', !sorting.countCar?.ascending)}>car added   {(sorting.countCar?.ascending===true)?'▲':(sorting.countCar?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"   onClick={() => applySorting('carRecordsCount', !sorting.carRecordsCount?.ascending)}>notecard generated   {(sorting.carRecordsCount?.ascending===true)?'▲':(sorting.carRecordsCount?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col">status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {allUserData!=undefined && allUserData.length > 0 &&
                    allUserData?.map((user) => (
                      <tr key={user.email}>
                        <th scope="row">{user.fullName}</th>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td> {user.countCar} </td>
                        <td> {user.carRecordsCount} </td>
                        <td>
                          <label className="custom-toggle">
                            <input defaultChecked={user.isVerified} onChange={() => handleCheckboxChange(user._id, user.isVerified)} type="checkbox" />
                            <span className="custom-toggle-slider rounded-circle" />
                          </label>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={() =>confirmAlert(options(handleuserDelete,user._id))}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserManagement;

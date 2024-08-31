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
  FormText,
  Col,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, addCategory, updateCategory, deleteCategory, updateCategoryStatus } from "../../redux/action/category"
import { handleApiCall } from '../../utils/apiUtils'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from '../../config';
import { useLocation } from "react-router-dom";
import useSortableTable from "utils/sortableTable";

import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const CategoryManagement = () => {
  const {sorting,SortableHeader}=   useSortableTable();

  const location = useLocation();
  const [open, setOpen] = useState(false)
  const [editFlag, setEditFlag] = useState(false)
  const [editCatId, setEditCatId] = useState("")
  const [editCatData, setEditCatData] = useState("")
  const dispatch = useDispatch();
  const allCategoriesData = useSelector((state) =>state?.category?.allCatgoryData?.data);


  const queryParams = new URLSearchParams(location.search);
 
  const initialSearchKey = queryParams.get('search') || '';

  const [searchKey, setSearchKey] = useState(initialSearchKey);
 
  const options =(deleteCallback,...parameters)=>(  {
    title: 'Confirmation !',
    message: 'Do you want to delete this category ?',
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



  useEffect(() => {
    
    setSearchKey(initialSearchKey);
  }, [initialSearchKey]);



  useEffect(() => {
    dispatch(getAllCategories(searchKey,sorting));
   
  }, [searchKey,sorting]);


  const handleCategoryDelete = async (id) => {
    try {
      const success = await handleApiCall(dispatch, deleteCategory(id));
      if (success) {
        dispatch(getAllCategories(searchKey));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newCategoryAdd = async (value) => {
    try {
      const success = await handleApiCall(dispatch, addCategory(value));
      if (success) {
        setOpen(false)
        dispatch(getAllCategories(searchKey));
      }

    } catch (error) {
      console.log(error);
    }
  };
 
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title Required")
  });

  const handleCheckboxChange = async (id, status) => {
    const updateStatus = {
      isActive: !status
    }
    try {
      const success = await handleApiCall(dispatch, updateCategoryStatus(id, updateStatus));
      if (success) {
        setOpen(false)
        dispatch(getAllCategories());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategoryEdit = async(id) =>{
    setOpen(true);
    setEditFlag(true);
    const catData = allCategoriesData.filter((item)=>item._id==id)[0];
    //console.log(catData);
    // Set the initial values for the form fields based on catData
    const initialValues = {
      title: catData.title || "",
      catIcon: null, // Set the initial value for catIcon, assuming you want to keep the existing value
      catIcon2: null,
      oldCatIcon: catData.icon, // Set the initial value for catIcon, assuming you want to keep the existing value
      oldCatIcon2: catData.icon2,
      options: catData.options,
      color:catData.color,  
      isActive: catData.isActive || 1,
    };
    //console.log(initialValues)
    setEditCatId(catData._id);
    setEditCatData(initialValues);
  }

  const updateCategoryData = async (id,value) => {console.log(id,value)
    try {
      const success = await handleApiCall(dispatch, updateCategory(id,value));
      if (success) {
        setOpen(false)
        dispatch(getAllCategories());
      }

    } catch (error) {
      console.log(error);
    }
  };

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
                    <h3 className="mb-0">Category Management</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={() =>{ setOpen(!open); setEditFlag(false);}}
                      size="sm"
                    >
                      Add New Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Modal className="modal-dialog-centered" isOpen={open}>
                <div className="modal-header bg-secondary">
                  <h3 className="modal-title" id="exampleModalLabel">
                  {editFlag? 'Edit Category':'Add New Category'}
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
                    initialValues={editFlag? editCatData:{ title: "", catIcon: null, catIcon2: null, options: "", isActive: 1 }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log("values=>", values);
                      try {
                        console.log("values=>", values);
                        if(editFlag){
                          await updateCategoryData(editCatId,values);
                        }else{
                          await newCategoryAdd(values);
                        }
                        
                        
                      } catch (error) {
                        console.error('Error submitting form:', error);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ values, setFieldValue }) => (
                      <Form role="form">
                        <FormGroup row className="mb-3">
                          <Label for="title" sm={3}>
                            Title
                          </Label>
                          <Col sm={9}>
                            <Field
                              type="text"
                              name="title"
                              placeholder="Category Title"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </FormGroup>



                        <FormGroup row className="mb-3">
                          <Label for="color" sm={3}>
                            Color
                          </Label>
                          <Col sm={9}>
                            <Field
                              type="text"
                              name="color"
                              placeholder="Color"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="color"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </FormGroup>


                        <FormGroup row className="mb-3">
                          <Label for="catIcon" sm={3}>
                            Icon
                          </Label>
                          <Col sm={9}>
                            {values.oldCatIcon && (
                                <img
                                  src={`${config.BACKEND_URL}/uploads/category/${values.oldCatIcon}`}
                                  alt="Cat-icon"
                                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                              )}
                            <input
                              type="file"
                              name="catIcon"
                              className="form-control"
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                setFieldValue("catIcon", file);

                                // Optional: Display the selected file name
                                //console.log("Selected file:", file.name);
                              }}
                            />
                            <ErrorMessage
                              name="catIcon"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row className="mb-3">
                          <Label for="catIcon2" sm={3}>
                            Icon 2
                          </Label>
                          <Col sm={9}>
                          {values.oldCatIcon2 && (
                            <img
                              src={`${config.BACKEND_URL}/uploads/category/${values.oldCatIcon2}`}
                              alt="Cat-icon"
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                          )}
                            <input
                              type="file"
                              name="catIcon2"
                              className="form-control"
                              onChange={(event) => {
                                const file2 = event.currentTarget.files[0];
                                setFieldValue("catIcon2", file2);

                                // Optional: Display the selected file name
                               // console.log("Selected file2:", file2.name);
                              }}
                              sm={9}
                            />
                            <ErrorMessage
                              name="catIcon2"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row className="mb-3">
                          <Label for="options" sm={3}>
                            SubCategory
                          </Label>
                          <Col sm={9}>
                            <Input
                              type="textarea"
                              name="options"
                              placeholder="Subcat1,Subcat2,Subcat3,..."
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue("options", event.currentTarget.value);
                               // console.log("Options:",event.currentTarget.value)
                              }}
                              value={values.options}
                            />

                            <FormText>
                              Put sub categories with comma seperated
                            </FormText>
                            <ErrorMessage
                              name="options"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </FormGroup>

                        <div className="text-center">
                          <Button className="my-4" color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Modal>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    
                    <SortableHeader columnKey="title">
                    Title
                     </SortableHeader>
                    <th scope="col">Icon</th>
                    <th scope="col">Icon2</th>
                    {/*<th scope="col">Options</th>*/}
                    <th scope="col">status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {allCategoriesData!=undefined && allCategoriesData.length > 0 &&
                    allCategoriesData?.map((category) => (
                      <tr key={category._id}>
                        <th scope="row">{category.title}</th>
                        <td>{category.icon!="" && <img src={`${config.BACKEND_URL}/uploads/category/${category.icon}`} alt="Cat-icon1" width="100" />}</td>
                        <td>{category.icon2!="" && <img src={`${config.BACKEND_URL}/uploads/category/${category.icon2}`} alt="Cat-icon2" width="100"/>}</td>
                        {/*<td  >{category.options}</td>*/}
                        <td>
                          <label className="custom-toggle">
                            <input defaultChecked={category.isActive} onChange={() => handleCheckboxChange(category._id, category.isActive)} type="checkbox" />
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
                                onClick={() => handleCategoryEdit(category._id)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() =>confirmAlert(options(handleCategoryDelete,category._id))}
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
               
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CategoryManagement;

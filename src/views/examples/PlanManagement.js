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
  import { getAllPlans,deletePlan,addPlan,updatePlan} from "../../redux/action/plan"
  import { handleApiCall } from '../../utils/apiUtils'
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';
  import config from '../../config';
  import { useLocation } from "react-router-dom";
  import useSortableTable from "utils/sortableTable";
  import { confirmAlert } from 'react-confirm-alert'; // Import

  import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
  
  const PlanManagement = () => {
    const location=useLocation() ; 
    const [open, setOpen] = useState(false)
    const [editFlag, setEditFlag] = useState(false)
    const [editCatId, setEditCatId] = useState("")
    const [editPlanData, setEditPlanData] = useState("")
    const dispatch = useDispatch();
    const allPlanData = useSelector((state) =>state?.plan?.allPlanData?.data);
  
    const {sorting,SortableHeader}=   useSortableTable();
    
  const queryParams = new URLSearchParams(location.search);
 
  const initialSearchKey = queryParams.get('search') || '';

  const [searchKey, setSearchKey] = useState(initialSearchKey);
 
  const options =(deleteCallback,...parameters)=>(  {
    title: 'Confirmation !',
    message: 'Do you want to delete this plan ?',
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
   
      dispatch(getAllPlans(searchKey,sorting));
     
    }, [searchKey,sorting]);
  
  
    const handlePlanDelete = async (id) => {
      try {
        const success = await handleApiCall(dispatch, deletePlan(id));
        if (success) {
          dispatch(getAllPlans(searchKey));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const newPlanAdd = async (value) => {
      try {
        console.log("Add values are ",value);
        const success = await handleApiCall(dispatch, addPlan(value));
        if (success) {
          setOpen(false)
          dispatch(getAllPlans(searchKey));
        }
  
      } catch (error) {
        console.log(error);
      }
    };
   
    const validationSchema = Yup.object().shape({
      title: Yup.string().required("Title Required").min(4, 'Too Short!').max(25, 'Too Long!')
 
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
  
    const handlePlanEdit = async(id) =>{
      setOpen(true);
      setEditFlag(true);
      const planData = allPlanData.filter((item)=>item._id==id)[0];
      //console.log(planData);
      // Set the initial values for the form fields based on planData
      const initialValues = {
        title: planData.title || "",
        description:planData.description,
        garageLimit:planData.garageLimit,
        type:planData.type,
        price:planData.price,
        isRecurring: planData.isRecurring,
      };
      //console.log(initialValues)
      setEditCatId(planData._id);
      setEditPlanData(initialValues);
    }
  
    const updatePlanData = async (id,value) => {console.log(id,value)
      try {
        const success = await handleApiCall(dispatch, updatePlan(id,value));
        if (success) {
          setOpen(false)
          dispatch(getAllPlans());
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
                      <h3 className="mb-0">Plan Management</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() =>{ setOpen(!open); setEditFlag(false);}}
                        size="sm"
                      >
                        Add New Plan
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Modal className="modal-dialog-centered" isOpen={open}>
                  <div className="modal-header bg-secondary">
                    <h3 className="modal-title" id="exampleModalLabel">
                    {editFlag? 'Edit Plan':'Add New Plan'}
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
                      initialValues={editFlag? editPlanData:{ title: "", description: "" , type: "Month", isRecurring: false,garageLimit:"" }}
                      validationSchema={validationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
                        console.log("values=>", values);
                        try {
                          console.log("values=>", values);
                          if(editFlag){
                            await updatePlanData(editCatId,values);
                          }else{
                            await newPlanAdd(values);
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
                                placeholder="Title"
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
                            <Label for="description" sm={3}>
                              Description
                            </Label>
                            <Col sm={9}>
                              <Field
                              as="textarea"
                            
                                name="description"
                                placeholder="Description"
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
                            <Label for="description" sm={3}>
                              Type
                            </Label>
                            <Col sm={9}>
                              <Field 
                            as="select"     
                            
                                name="type"
                                placeholder="Type"
                                className="form-control"
                              >
                                <option value="Month">Month</option>
                                <option value="Quarter">Quarter</option>
                                <option value="Half Year">Half Year</option>
                                <option value="Year">Year</option>
                            </Field>
                              <ErrorMessage
                                name="type"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup row className="mb-3">
                            <Label for="price" sm={3}>
                            Price
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="text"
                                name="price"
                                placeholder="Price"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup row className="mb-3">
                            <Label for="garageLimit" sm={3}>
                            Garage Limit
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="text"
                                name="garageLimit"
                                placeholder="Garage Limit"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="garageLimit"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </FormGroup>




                          <FormGroup row className="mb-3">
                            <Label for="isRecurring" sm={3}>
                              Is Recurring ?
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="checkbox"
                                name="isRecurring"
                                 
                                className="form-control"
                              />
                              <ErrorMessage
                                name="isRecurring"
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
                      <th scope="col">description</th>
                 
                      {/*<th scope="col">Options</th>*/}
        

                                     
                    <SortableHeader columnKey="type">
                    Type
                     </SortableHeader>
                     <SortableHeader columnKey="price">
                    Price
                     </SortableHeader>
                     <SortableHeader columnKey="garageLimit">
                      Garage Limit
                     </SortableHeader>
                      <SortableHeader columnKey="isRecurring">
                      Is Recurring?
                     </SortableHeader>

               
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {allPlanData!=undefined && allPlanData.length > 0 &&
                      allPlanData?.map((plan) => (
                        <tr key={plan._id}>
                          <th scope="row">{plan.title}</th>
                          <td>{plan.description}</td>
                          <td>{plan.type} </td>
                          <td>{plan.price} </td>
                          <td>{plan.garageLimit} </td>
                          <td>
                          {(plan.isRecurring)?'Yes':'No'}
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
                                  onClick={() => handlePlanEdit(plan._id)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() =>confirmAlert(options(handlePlanDelete,plan._id)) }
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
  
  export default PlanManagement;
  
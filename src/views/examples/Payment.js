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
  import { getAllPayments} from "../../redux/action/payment"
  import { handleApiCall } from '../../utils/apiUtils'
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';
  import config from '../../config';
  import { useLocation } from "react-router-dom";
  import useSortableTable from "utils/sortableTable";
 

  const PlanManagement = () => {
    const location=useLocation() ; 
    const [open, setOpen] = useState(false)
    const [editFlag, setEditFlag] = useState(false)
    const [editCatId, setEditCatId] = useState("")
    const [editPlanData, setEditPlanData] = useState("")
    const dispatch = useDispatch();
    const allPaymentData = useSelector((state) =>state?.payment?.allPaymentData.docs);
    const {sorting,SortableHeader}=   useSortableTable();
    
  const queryParams = new URLSearchParams(location.search);
 
  const initialSearchKey = queryParams.get('search') || '';

  const [searchKey, setSearchKey] = useState(initialSearchKey);
 

 

  useEffect(() => {
    setSearchKey(initialSearchKey); 
    
   
  }, [initialSearchKey]);


  
  useEffect(() => {
    console.log("allPaymentData",allPaymentData);
    
   
  }, [allPaymentData]);




    useEffect(() => {
   
      dispatch(getAllPayments(searchKey,sorting));
     
    }, [searchKey,sorting]);
  
  
 
    const newPlanAdd = async (value) => {
      try {
        console.log("Add values are ",value);
        const success = await handleApiCall(dispatch, addPlan(value));
        if (success) {
          setOpen(false)
          dispatch(getAllPayments(searchKey));
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
      const planData = allPaymentData.filter((item)=>item._id==id)[0];
      //console.log(planData);
      // Set the initial values for the form fields based on planData
      const initialValues = {
        title: planData.title || "",
        description:planData.description,
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
          dispatch(getAllPayments());
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
                      <h3 className="mb-0">Payments</h3>
                    </div>
               
                  </Row>
                </CardHeader>
            
  
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                
                          <SortableHeader columnKey="plan.0.title">

                            Plans
                          </SortableHeader>
       
                      
                      <SortableHeader columnKey="user.0.fullName">

                      User
                      </SortableHeader>
                 
                      <SortableHeader columnKey="paymentStatus">

                      Status
                      </SortableHeader>
                      <SortableHeader columnKey="amount">

                      Amount
                      </SortableHeader>
                      <SortableHeader columnKey="paymentDate">

                      Payment Date
                      </SortableHeader>
                   
                      <SortableHeader columnKey="plan.0.isRecurring">

                      Is Recurring?
                    </SortableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {allPaymentData!=undefined && allPaymentData.length > 0 &&
                      allPaymentData?.map((payment) => (
                        <tr key={payment._id}>
                          <th scope="row">{payment?.plan[0].title}</th>
                          <td>{payment?.user?.fullName}</td>
                          <td>{payment.paymentStatus} </td>
                          <td>${payment.amount/100} </td>
                          <td>{new Date(payment.createdAt).toLocaleDateString()} </td>
                          <td>
                          {(payment?.plan[0].isRecurring)?'Yes':'No'}
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
  
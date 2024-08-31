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
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Modal,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllVehicleLogs, getVehicleLog, deleteVehicleLog, updateVehicleLogStatus } from "../../redux/action/vehiclelog"
import { handleApiCall } from '../../utils/apiUtils'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from '../../config';
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const VehicleLogManagement = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get("carId");
  const initialSearchKey = queryParams.get('search') || '';
  const [open, setOpen] = useState(false);
  const [vehicleLogData, setVehicleLogData] = useState([]);

  const dispatch = useDispatch();
  const allVehicleLogData = useSelector((state) =>state?.vehiclelog?.allVehicleLogData?.result);
  const [searchKey, setSearchKey] = useState(initialSearchKey);
 
  const [sorting, setSorting] = useState({ });


  const options =(deleteCallback,...parameters)=>(  {
    title: 'Confirmation !',
    message: 'Do you want to delete this record ?',
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


  const applySorting = (key, ascending) => {
    console.log("testing is ",{
   
      [key]: { ascending }
    }); 
    setSorting(prevSorting => ({
   
      [key]: { ascending }
    }));
  };


  useEffect(() => {
    if(carId){
      dispatch(getVehicleLog(carId));
    }else{
      dispatch(getAllVehicleLogs(searchKey,sorting));
    }
    
   console.log(allVehicleLogData)
  }, [ searchKey,sorting]);



  useEffect(() => {
    
    setSearchKey(initialSearchKey);
  }, [initialSearchKey]);



  const handleCarDelete = async (id) => {
    try {
      const success = await handleApiCall(dispatch, deleteVehicleLog(id));
      if (success) {
        if(carId){
          dispatch(getVehicleLog(carId));
        }else{
          dispatch(getAllVehicleLogs());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (id, status) => {
    const updateStatus = {
      isActive: !status
    }
    try {
      const success = await handleApiCall(dispatch, updateVehicleLogStatus(id, updateStatus));
      if (success) {
        setOpen(false)
        if(carId){
          dispatch(getVehicleLog(carId));
        }else{
          dispatch(getAllVehicleLogs());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCarRecordView = async(id) =>{
    setOpen(true);
    const VehicleLogData = allVehicleLogData.filter((item)=>item._id==id)[0];
    setVehicleLogData(VehicleLogData);
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--8" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{carId? `Vehicle log for car#${carId}` :`Vehicle Log Management`}</h3>
              </CardHeader>

              <Modal className="modal-dialog-centered" isOpen={open}>
                <div className="modal-header bg-secondary">
                  <h3 className="modal-title" id="exampleModalLabel">
                  Vehicle Log Detail #{vehicleLogData._id}
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
                <Table className="align-items-center table-flush" responsive>
                  <tr>
                    <th scope="col">Category</th>
                    <td scope="col">{vehicleLogData.categoryId?.title}</td>
                    <th scope="col"></th>
                    <td scope="col"></td>
                  </tr>
                  <tr>
                    <th scope="col">Type</th>
                    <td scope="col">{vehicleLogData.type?.charAt(0).toUpperCase() + vehicleLogData.type?.slice(1)}</td>
                    <th scope="col">Log Date</th>
                    <td scope="col">{(vehicleLogData.logDate)?(new Date(vehicleLogData.logDate).toLocaleDateString()):''}</td>
                  </tr>
                  <tr>
                    <th scope="col">Location</th>
                    <td scope="col">{vehicleLogData.location}</td>
                    <th scope="col">Mileage</th>
                    <td scope="col">{Math.round(vehicleLogData.mileage*0.621371)}</td>
                  </tr>
                  <tr>
                    <th scope="col">Note Card Type</th>
                    <td scope="col">{vehicleLogData.notecardType?.charAt(0).toUpperCase() + vehicleLogData.notecardType?.slice(1)}</td>
                    
                  </tr>
                  <tr>
                
                    <th scope="col" colspan={1}>Short Description</th>
                    <td scope="col" colspan={3} style={{'white-space': "break-spaces" }}>{vehicleLogData.notes}</td>
                  </tr>
                  <tr>
                    <td scope="col" colSpan={4}></td>
                  </tr>
                  
                  {vehicleLogData.type=="detail" ? (
                  <tr>
                    <th scope="col">Car Care Option</th>
                    <th scope="col">Part number</th>
                    <th scope="col">Source</th>
                    <th scope="col">Cost</th>
                  </tr>
                  ):
                  (
                  <tr>
                    <th scope="col">{vehicleLogData.categoryId?.title} Option</th>
                    <th scope="col" colspan={3}>Cost</th>
                  </tr>
                  )}
           
                  {vehicleLogData.options?.map((logData,index)=>(
                    <tr key={logData._id}>
                       <td scope="col">{index+1}. {logData.name}</td>
                       {vehicleLogData.type=="detail" ? (
                          <>
                          <td scope="col">{logData.partNumber}</td>
                          <td scope="col">{logData.source}</td>
                          <td scope="col">{logData.cost}</td>
                          </>
                        ):(
                          <>
                          <td scope="col">{logData.cost}</td>
                          <td scope="col"></td>
                          <td scope="col"></td>
                          </>
                        )
                      }
                      </tr>
                    ))}
                  <tr>
                    <td scope="col" colSpan={4}></td>
                  </tr>
                  <tr>
                    <th scope="col">Reminder</th>
                    <td scope="col">   {vehicleLogData.occurance_type && (
                          <li>Remind me {vehicleLogData.remindMeText}</li>

                        )}</td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                  </Table>
                </div>
              </Modal>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                   
                    <th scope="col" role="button" onClick={() => applySorting('type', !sorting.type?.ascending)}>type  {(sorting.type?.ascending===true)?'▲':(sorting.type?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button" onClick={() => applySorting('location', !sorting.location?.ascending)}>Location  {(sorting.location?.ascending===true)?'▲':(sorting.location?.ascending===false)?'▼':'▲▼'}</th>


                    <th scope="col" role="button" onClick={() => applySorting('mileage', !sorting.mileage?.ascending)}>Mileage  {(sorting.mileage?.ascending===true)?'▲':(sorting.mileage?.ascending===false)?'▼':'▲▼'}</th>


                    <th scope="col" role="button" onClick={() => applySorting('logDate', !sorting.logDate?.ascending)}>Log Date  {(sorting.logDate?.ascending===true)?'▲':(sorting.logDate?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"   onClick={() => applySorting('categoryId.title', !sorting["categoryId.title"]?.ascending)}>Category {(sorting["categoryId.title"]?.ascending===true)?'▲':(sorting["categoryId.title"]?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"   onClick={() => applySorting('userId.fullName', !sorting["userId.fullName"]?.ascending)}>User Name {(sorting["userId.fullName"]?.ascending===true)?'▲':(sorting["userId.fullName"]?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button" onClick={() => applySorting('notecardType', !sorting.notecardType?.ascending)}>Notecard Type  {(sorting.notecardType?.ascending===true)?'▲':(sorting.notecardType?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {allVehicleLogData!=undefined && allVehicleLogData.length > 0 &&
                    allVehicleLogData?.map((vlog) => (
                      <tr key={vlog._id}>
                       
                        <td>{ vlog.type?.charAt(0).toUpperCase() + vlog.type?.slice(1)}</td>
                        <td>{vlog.location}</td>
                        <td>{Math.round(vlog.mileage*0.621371)}</td>
                        <td>{(vlog.logDate)?(new Date(vlog.logDate).toLocaleDateString()):''}</td>
                        <td>{vlog.categoryId?.title}</td>
                        <td>{vlog?.userId?.fullName}</td>
                        <td>{vlog.notecardType?.charAt(0).toUpperCase() + vlog.notecardType?.slice(1)}</td>
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
                                onClick={(e) => handleCarRecordView(vlog._id)}
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() =>confirmAlert(options(handleCarDelete,vlog._id)) }
                              >
                                Delete
                              </DropdownItem>

                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                  </tr>))}

                </tbody>
              </Table>
              <CardFooter className="py-4">
                {/*<nav aria-label="...">
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
                </nav>*/}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default VehicleLogManagement;

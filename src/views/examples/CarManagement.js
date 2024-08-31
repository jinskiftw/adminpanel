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
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCars, getCar, deleteCar, updateCarStatus } from "../../redux/action/car"
import { handleApiCall } from '../../utils/apiUtils'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from '../../config';
import CarImg from 'assets/img/theme/car.svg';
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const CarManagement = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cid = queryParams.get("id");
//console.log("cid=>",cid)
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const dispatch = useDispatch();
  const allCarsData = useSelector((state) =>state?.car?.allCarData?.cars);
  const [searchKey, setSearchKey] = useState('');


  const options =(deleteCallback,...parameters)=>(  {
    title: 'Confirmation !',
    message: 'Do you want to delete this car ?',
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


  //;

 
  const initialSearchKey = queryParams.get('search') || '';
  
  const [sorting, setSorting] = useState({model:{ascending:null} });


  const applySorting = (key, ascending) => {
    setSorting(prevSorting => ({
   
      [key]: { ascending }
    }));
  };



  useEffect(() => {
    var sortvalue={} ; 
 

 
  
    dispatch(getAllCars(cid,searchKey,sorting));
   console.log(allCarsData)
  }, [dispatch,searchKey,sorting]);


  useEffect(() => {
    
    setSearchKey(initialSearchKey);
  }, [initialSearchKey]);

 
  const handleCarDelete = async (id) => {
 
    try {
      const success = await handleApiCall(dispatch, deleteCar(id));
      if (success) {
        dispatch(getAllCars(cid));
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
      const success = await handleApiCall(dispatch, updateCarStatus(id, updateStatus));
      if (success) {
        setOpen(false)
        dispatch(getAllCars(cid));
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleCarView = async(id) =>{
    setOpen(true);
    const carData = allCarsData.filter((item)=>item._id==id)[0];
    setCarData(carData);
  }
  const handleCarRecords =(id)=>{
    navigate(`/admin/vehicle-logs?carId=${id}`);
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
                <h3 className="mb-0">Car Management</h3>
              </CardHeader>

              <Modal className="modal-dialog-centered" isOpen={open}>
                <div className="modal-header bg-secondary">
                  <h3 className="modal-title" id="exampleModalLabel">
                  Car Detail #{carData._id}
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
                {carData?.carImage?.map((img)=>(
                  <img src={`${config.BACKEND_URL}/uploads/cars/${img.image}`} alt="" width="100" />
                ))}
                <Table className="align-items-center table-flush" responsive>
                  <tr>
                    <th scope="col">Manufacturer Year</th>
                    <td scope="col">{carData.manufacturerYear}</td>
                    <th scope="col">Manufacturer</th>
                    <td scope="col">{carData.manufacturer}</td>
                  </tr>
                  <tr>
                    <th scope="col">Model</th>
                    <td scope="col">{carData.model}</td>
                    <th scope="col">Mileage</th>
                    <td scope="col">{Math.round(carData.mileage*0.621371)}</td>
                  </tr>
                  <tr>
                    <th scope="col">Color</th>
                    <td scope="col">{carData.color}</td>
                    <th scope="col">Transmission</th>
                    <td scope="col">{carData.transmission}</td>
                  </tr>
                  <tr>
                    <th scope="col">VIN</th>
                    <td scope="col">{carData.vin}</td>
                    <th scope="col">License Plate Number</th>
                    <td scope="col">{carData.licensePlateNumber}</td>
                  </tr>
                  <tr>
                    <th scope="col">Purchase Price</th>
                    <td scope="col">{carData.purchasePrice}</td>
                    <th scope="col">Years Owned</th>
                    <td scope="col">{carData.yearsOwned}</td>
                  </tr>
                  <tr>
                    <th scope="col">Miles Driven Per Year</th>
                    <td scope="col">{carData.milesDrivenPerYear}</td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                  <tr>
                    <th scope="col">Short Description</th>
                    <td scope="col" colSpan={3}  style={{'white-space': "break-spaces" }}>{carData.shortDescription}</td>
                  </tr>
                  </Table>
                </div>
              </Modal> 

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">image</th>
                    <th scope="col"  role="button" onClick={() => applySorting('model', !sorting.model?.ascending)}>model  {(sorting.model?.ascending===true)?'▲':(sorting.model?.ascending===false)?'▼':'▲▼'}
  </th>
                    <th scope="col" role="button"  onClick={() => applySorting('manufacturer', !sorting.manufacturer?.ascending)}>make  {(sorting.manufacturer?.ascending===true)?'▲':(sorting.manufacturer?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"  onClick={() => applySorting('manufacturerYear', !sorting.manufacturerYear?.ascending)}>year  {(sorting.manufacturerYear?.ascending===true)?'▲':(sorting.manufacturerYear?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"  onClick={() => applySorting('mileage', !sorting.mileage?.ascending)}>Mileage  {(sorting.mileage?.ascending===true)?'▲':(sorting.mileage?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"  onClick={() => applySorting('userFullName', !sorting.userFullName?.ascending)}>user name  {(sorting.userFullName?.ascending===true)?'▲':(sorting.userFullName?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col" role="button"  onClick={() => applySorting('carRecordsCount', !sorting.carRecordsCount?.ascending)}>number of notecard  {(sorting.carRecordsCount?.ascending===true)?'▲':(sorting.carRecordsCount?.ascending===false)?'▼':'▲▼'}</th>
                    <th scope="col">status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {allCarsData!=undefined && allCarsData.length > 0 &&
                    allCarsData?.map((car) => (
                      <tr key={car._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => handleCarView(car._id)}
                            >
                              <img
                                alt="..."
                                src={car.carImage[0]?.image!="" ? `${config.BACKEND_URL}/uploads/cars/${car.carImage[0]?.image}` : CarImg}
                                onError={(e) => {
                                  console.error("Error loading image:", e);
                                }}
                              />
                            </a>
                          </Media>
                        </th>
                        <td>{car.model}</td>
                        <td>{car.manufacturer}</td>
                        <td>{ (car.manufacturerYear)}</td>
                        <td>{Math.round(car.mileage*0.621371)}</td>
                        <td>{car.userFullName}</td>
                        <td align="center">{car.carRecordsCount && <a href="#" onClick={(e) => handleCarRecords(car._id)}>{car.carRecordsCount} </a>}</td>
                        <td>
                          <label className="custom-toggle">
                            <input defaultChecked={car.isActive} onChange={() => handleCheckboxChange(car._id, car.isActive)} type="checkbox" />
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
                                onClick={(e) => handleCarView(car._id)}
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => handleCarRecords(car._id)}
                              >
                                Note Cards
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => confirmAlert(options(handleCarDelete,car._id))}
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

export default CarManagement;

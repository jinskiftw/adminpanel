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
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
 
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Media,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

 
import Header from "components/Headers/Header.js";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDashboardCostBreakdown,getDashboardRecentPayment } from "../redux/action/auth"
import { handleApiCall } from '../utils/apiUtils'
import config from '../config';
 
import ReactApexChart from "react-apexcharts";

const Index = (props) => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
 
  const dispatch = useDispatch();
  const DashboardData = useSelector((state) =>state?.auth?.dashboardData?.count);
 
  const PaymentData = useSelector((state) => state?.auth?.dashboardData?.recentPayments);
  const costBreakingData= useSelector((state) => state?.auth?.dashboardData?.costBreakdown);
  useEffect(() => {
 
     dispatch (getDashboardRecentPayment());
     dispatch (getDashboardCostBreakdown());

     
  }, [dispatch]);
  

  const initialValue={
    series: [20, 20, 20, 20, 20],
   
    options: {
      chart: {
        width: 380, 
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  };
  const [pieChartData,setPieChartData]=useState(initialValue);

  const labels=[];
  const data=[];
  useEffect(()=>{
    if(costBreakingData)
    {
      console.log("costBreakingData  KK",costBreakingData);
      const organizedData = [  ["Category", "Sum"]];
    
      costBreakingData.forEach((item)=>{
        data.push(item.sumOfCosts); 
        labels.push(item.categoryName); 
      //  organizedData.push([item.categoryName,item.sumOfCosts]);

      });
      setPieChartData(prev => {
        return {
          ...prev ,
          options:{...prev.options,labels:labels} ,
          series:data
        }

      });

 
     
    } 
   

  },[costBreakingData]);

  const options = {
    title: "Cost breakdown",
    sliceVisibilityThreshold:0.0001
 };


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
       
       {/*<Row>
            <div>
              <div id="chart">
                <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="pie" width={450} />
              </div>
              <div id="html-dist"></div>
            </div>
        </Row>*/}
        <Row>
   
          <Col className="mb-5 mb-xl-0" xl="5">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Recent Transactions</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => navigate('/admin/payments')}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Plan</th>
                  </tr>
                </thead>
                <tbody>

            {PaymentData && PaymentData?.map((item)=>(


                            <tr>
                            <th scope="row">{item.userId?.fullName}</th>
                            <td>{item.amount/100}</td>
                            <td>
                           {item.planId?.title}
                            </td>                    
                            </tr>
            ))}



                
                
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Latest Car Entry</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) =>navigate('/admin/car-management')}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Car Name</th>
                    <th scope="col">Date of entry</th>
                    <th scope="col">user Name</th>
                    <th scope="col">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {DashboardData?.car_list?.map((car)=>(
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                        <a
                          className="avatar"
                          href="#pablo"
                          onClick={(e) => navigate(`/admin/car-management/?id=${car._id}`)}
                        >
                          <img
                            alt=" "
                            src={`${config.BACKEND_URL}/uploads/cars/${car.carImage[0]?.image}`}
                          />
                        </a>
                      </Media></th>
                      <td>{car.manufacturer} {car.model}</td>
                      <td>{new Date(car.createdAt).toLocaleDateString()}</td>
                      <td>{car?.userId?.fullName}</td>
                      <td><a href={`/admin/car-management/?id=${car._id}`}>View</a></td>
                    </tr>
                  ))}
                               
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
 
      </Container>
    </>
  );
};

export default Index;

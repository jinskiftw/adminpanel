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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCostBreakdown, getDashboardData ,getDashboardRecentPayment} from "../../redux/action/auth"
import ReactApexChart from "react-apexcharts";


const Header = () => {
  const dispatch = useDispatch();
  const DashboardData = useSelector((state) => state?.auth?.dashboardData?.count);
  const costBreakingData= useSelector((state) => state?.auth?.dashboardData?.costBreakdown);
 
  useEffect(() => {
      dispatch ( getDashboardData() );
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
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col  lg="6" xl="6">
                <div>
                <style>{'.apexcharts-legend-text { color: #FFF !important; }'}</style>
                  <div id="chart">
                    <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="pie" width={450} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </Col>
              <Col  lg="6" xl="6"> 
                <Row>
                  {/* <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0" style={{margin: '20px 0'}}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Revenue
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {DashboardData?.total_revenue}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-money-bill" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap d-block">Total revenue generated  </span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col> */}
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0"  style={{margin: '20px 0'}}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Cars
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{DashboardData?.car_count}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-car" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {/*<span className="text-success mr-2">
                            <i className="fas fa-arrow-up" /> 3.48%
                          </span>*/}
                          <span className="text-nowrap d-block">Total number of cars added</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0"  style={{margin: '20px 0'}}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Notecards
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{DashboardData?.carrecord_count}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-note-sticky" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {/*<span className="text-success mr-2">
                            <i className="fas fa-arrow-up" /> 1.10%
                          </span>*/}
                          <span className="text-nowrap d-block">Total number of notecards created</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0"  style={{margin: '20px 0'}}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Users
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{DashboardData?.user_count}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="fas fa-users" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {/*<span className="text-success mr-2">
                            <i className="fas fa-arrow-up" /> 0%
                          </span>*/}
                          <span className="text-nowrap d-block">Total number of users</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0"  style={{margin: '20px 0'}}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Subscribed Users
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{DashboardData?.total_subscribed}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="fas fa-users" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {/*<span className="text-success mr-2">
                            <i className="fas fa-arrow-up" /> 0%
                          </span>*/}
                          <span className="text-nowrap d-block">Total number of subscribed users</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

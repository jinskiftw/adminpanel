
import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    // Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { forgotPassword, logIn } from "../../redux/action/auth";
import { handleApiCall } from "../../utils/apiUtils";
import { useNavigate } from "react-router";

const ForgotPassword = (props) => {
    const mainContent = React.useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleForgotPassword = async (values, { resetForm }) => {
        const data = {
            role: 'admin',
            ...values
        }
        try {
            const success = await handleApiCall(dispatch, forgotPassword(data));
            if (success) {
                resetForm();
                <Navigate to="/auth/login" />;
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
                <div className="header bg-gradient-info py-7 py-lg-8">
                    <Container>
                        <div className="header-body text-center mb-5">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Enter email for reset password!</h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                {/* Page content */}
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Col lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <Formik
                                        initialValues={{ email: "" }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleForgotPassword}
                                    >
                                        <Form role="form">
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
                                                        autoComplete="new-email"
                                                        className="form-control"
                                                    />
                                                </InputGroup>
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    RESET PASSWORD
                                                </Button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ForgotPassword;

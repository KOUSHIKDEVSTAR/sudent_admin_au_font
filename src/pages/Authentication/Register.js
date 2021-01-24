import React, { Component } from "react";
import { Row, Col, Button, Alert, Container, Label, FormGroup } from "reactstrap";
import axios from "axios";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import {  registerUser, registerUserFailed, apiError } from '../../store/actions';

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// import images
import logodark from "../../assets/images/logo-dark.png";
import { showToast } from "../../config/toastr/toast";
import { BASE_URL } from "../../config/static";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: "",
        username: "",
        password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event, values) {
    
    this.props.registerUser(values)
    console.log(values);
    // axios({
    //     method:'POST',
    //     url:'localhost:9001/users/register',
    //     data:values
    // })
    axios.post(`${BASE_URL}users/register`, {
        email: values.email,
        password:values.password,
        first_name:values.first_name,
        last_name:values.last_name,
        mobile:values.mobile,
        role:values.role
        

        
    })
    .then(response => {

        //201=User already registered
        if(response.data===201){
            showToast('Warning', 'User already registered'); 
            // this.props.history.replace('/register');
        }else{
            showToast('Success', 'Register Success'); 
            this.props.history.replace('/login');
        }
        
    })
    .catch(error =>{
        console.log(error)
    })
}

  componentDidMount()
  {
    this.props.registerUserFailed("");
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
  }


  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
            <Link to="/"><i className="mdi mdi-home-variant h2 text-white"></i></Link>
        </div>
        <div>
            <Container fluid className="p-0">
                <Row className="no-gutters">
                    <Col lg={12}>
                        <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                            <div className="w-100">
                                <Row className="justify-content-center">
                                <Col lg={4}>
                                </Col>
                                    <Col lg={4}>
                                        <div>
                                            <div className="text-center">
                                                <div>
                                                    <Link to="#" className="logo"><img src={logodark} height="20" alt="logo"/></Link>
                                                </div>
    
                                                <h4 className="font-size-18 mt-4">Register account</h4>
                                                <p className="text-muted">Get your free Nazox account now.</p>
                                            </div>

                                            {this.props.user && <Alert color="success">Registration Done Successfully.</Alert>}

                                            {this.props.registrationError && <Alert color="danger">{this.props.registrationError}</Alert>}

                                            <div className="p-2 mt-5">
                                                <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal" >
                                                <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="first_name">First Name</Label>
                                                        <AvField name="first_name"  value={this.state.first_name} validate={{required: true}} type="text" className="form-control" id="first_name" placeholder="Enter First Name"/>
                                                    </FormGroup>

                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="last_name">First Name</Label>
                                                        <AvField name="last_name"  value={this.state.last_name} validate={{required: true}} type="text" className="form-control" id="last_name" placeholder="Enter Last Name"/>
                                                    </FormGroup>

                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-mail-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="useremail">Email</Label>
                                                        <AvField name="email"  value={this.state.email} validate={{email: true, required: true}} type="email" className="form-control" id="useremail" placeholder="Enter email"/>
                                                    </FormGroup>
                    
                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-phone-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="mobile">Phone</Label>
                                                        <AvField name="mobile"  value={this.state.mobile} validate={{required: true}} type="number" className="form-control" id="mobile" placeholder="Enter Phone" />
                                                        <AvField name="role"  value="2" validate={{required: true}} type="hidden" className="form-control" id="mobile" placeholder="Enter email"/>
                                                    </FormGroup>
                            
                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="userpassword">Password</Label>
                                                        <AvField name="password"  value={this.state.password} validate={{required: true}} type="password" className="form-control" id="userpassword" placeholder="Enter password"/>
                                                    </FormGroup>
                            

                                                    <div className="text-center">
                                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Loading ..." : "Register"}</Button>
                                                    </div>

                                                    <div className="mt-4 text-center">
                                                        <p className="mb-0">By registering you agree to the Nazox <Link to="#" className="text-primary">Terms of Use</Link></p>
                                                    </div>
                                                </AvForm>
                                            </div>

                                            <div className="mt-5 text-center">
                                                <p>Already have an account ? <Link to="/login" className="font-weight-medium text-primary"> Login</Link> </p>
                                                <p>© 2020 Nazox. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p>
                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={4}>
                                </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>

      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {

  const { user, registrationError, loading } = state.Account;
//   return { user, registrationError, loading };
}

export default withRouter(connect(mapStatetoProps, { registerUser, apiError, registerUserFailed })(Register));

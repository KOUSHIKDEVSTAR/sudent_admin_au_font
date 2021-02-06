import React, { Component , useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, CustomInput,Button, Alert,InputGroupAddon } from "reactstrap";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { checkUserAuthenticity } from "../../helpers/checkUserAuthenticity/checkAuthenticity";
import { BASE_URL, SITE_NAME } from "../../config/static";
import Axios from "axios";
import { showToast } from "../../config/toastr/toast";
import { getDataFromLocalStorage } from "../../config/localStorage/localStorageHelperMethords";





class StudentEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : SITE_NAME, link : "#" },
                { title : "Edit Student", link : "#" },
            ],
            customchk: true,
            toggleSwitch: true,
            ue: null,
            ut: null,
            userdata: this.props.location.data
        };
        this.textareachange = this.textareachange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    textareachange(event) {
		var count = event.target.value.length;
		if (count > 0) {
			this.setState({ textareabadge: true });
		} else {
			this.setState({ textareabadge: false });
		}
		this.setState({ textcount: event.target.value.length });
	}
    async componentDidMount() {
        
        Axios.post(`${BASE_URL}student-admin/userdata`, {
            id: this.state.userdata.id
        }).then(response => {
            // console.log(response.data.data[0]);
            this.setState({userID:response.data.data[0].id })
            this.setState({first_name:response.data.data[0].first_name })
            this.setState({last_name:response.data.data[0].last_name })
            this.setState({email:response.data.data[0].email })
            this.setState({mobile:response.data.data[0].mobile })
            this.setState({address:response.data.data[0].address })
            
        }).catch(err =>{
            console.log(err);
        })
    }
    async getuserdata(){
        let ud  = await getDataFromLocalStorage('logUserId');
        let utoken  = await getDataFromLocalStorage('logUserToken');
        this.setState({ut: utoken});
        this.setState({ue: ud});
    }

    handleSubmit(event, values) {
    
        
       
        
        Axios.post(`${BASE_URL}student-admin/profileEdit`, {
            email: values.email,
            address:values.address,
            first_name:values.first_name,
            last_name:values.last_name,
            mobile:values.mobile,
            id:values.userid
            
            
    
            
        })
        .then(response => {
    
            //201=User already registered
            if(response.data===201){
                showToast('Warning', 'User already registered'); 
                // this.props.history.replace('/register');
            }else{
                showToast('Success', 'Update Success'); 
                this.props.history.replace('/studentList');
            }
            
        })
        .catch(error =>{
            console.log(error)
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Edit Student" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">Edit Student</h4>
                                        <div className="p-2 mt-5">
                                                <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal" >
                                                <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="first_name">First Name</Label>
                                                        <AvField name="userid"  value={this.state.userID} validate={{required: true}} type="hidden" className="form-control" id="first_name" placeholder="Enter First Name"/>
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
                                                        <AvField name="email"  value={this.state.email} validate={{email: true, required: true}} type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                                    </FormGroup>
                    
                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-phone-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="mobile">Phone</Label>
                                                        <AvField name="mobile"  value={this.state.mobile} validate={{required: true}} type="number"  className="form-control" id="mobile" placeholder="Enter Phone" />
                                                        
                                                    </FormGroup>
                            
                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="useraddress">Address</Label>
                                                        <AvField name="address"  value={this.state.address} validate={{required: true}} type="textarea" row="3" className="form-control" id="" placeholder="Enter address"/>
                                                        {/* <Input
												type="textarea"
												id="textarea"
												onChange={this.textareachange}
												maxLength="225"
												rows="3"
												placeholder="Address"
											/>
											{this.state.textareabadge ? (
												<span className="badgecount badge badge-info">
													{" "}
													{this.state.textcount} / 225{" "}
												</span>
											) : null} */}
                                                    </FormGroup>
                                                    

                                                    <div className="text-left">
                                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Loading ..." : "Save Student"}</Button>
                                                    </div>

                                                    
                                                </AvForm>
                                            </div>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(StudentEditPage) ;

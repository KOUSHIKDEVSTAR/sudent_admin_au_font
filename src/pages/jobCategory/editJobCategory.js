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





class EditJobCategoryPage extends Component {
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
       
        Axios.post(`${BASE_URL}job-category-admin/job-categorydata`, {
            id: this.state.userdata.job_category_id
            
        }).then(response => {
            // console.log(response.data.data[0]);
            this.setState({job_category_id:response.data.data[0].job_category_id })
            this.setState({job_category_title:response.data.data[0].job_category_title })
            
            
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
    
        
       
        
        Axios.post(`${BASE_URL}job-category-admin/job-categoryEdit`, {
            job_category_id: values.job_category_id,
            job_category_title: values.job_category_title
            
        })
        .then(response => {
    
            //201=User already registered
            if(response.data===201){
                showToast('Warning', 'User already registered'); 
                // this.props.history.replace('/register');
            }else{
                showToast('Success', 'Update Success'); 
                this.props.history.replace('/jobCategoryList');
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

                        <Breadcrumbs title="Edit Job Category" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">Edit Job Category</h4>
                                        <div className="p-2 mt-5">
                                                <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal" >
                                                <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="job_category_title">First Name</Label>
                                                        <AvField name="job_category_id"  value={this.state.job_category_id} validate={{required: true}} type="hidden" className="form-control" id="job_category_title" placeholder="Enter First Name"/>
                                                        <AvField name="job_category_title"  value={this.state.job_category_title} validate={{required: true}} type="text" className="form-control" id="job_category_title" placeholder="Enter First Name"/>
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

export default withRouter(EditJobCategoryPage) ;

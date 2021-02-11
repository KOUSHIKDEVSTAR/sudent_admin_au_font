import React, { Component , useState, useEffect } from "react";
import { Table,Card, CardBody, Col, Row, Container, FormGroup, Label, Input, CustomInput,Button, Alert,InputGroupAddon } from "reactstrap";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { checkUserAuthenticity } from "../../helpers/checkUserAuthenticity/checkAuthenticity";
import { BASE_URL, SITE_NAME } from "../../config/static";
import Axios from "axios";
import { showToast } from "../../config/toastr/toast";
import { getDataFromLocalStorage } from "../../config/localStorage/localStorageHelperMethords";





class StudentViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : SITE_NAME, link : "#" },
                { title : "Student Profile", link : "#" },
            ],
            customchk: true,
            toggleSwitch: true,
            ue: null,
            ut: null,
            userdata: this.props.location.data
        };
        
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
        
        Axios.post(`${BASE_URL}users-admin/userdata`, {
            id: this.state.userdata.id
        }).then(response => {
            console.log(response.data.data[0]);
            this.setState({userID:response.data.data[0].id })
            this.setState({fname:response.data.data[0].fname })
            this.setState({lname:response.data.data[0].lname })
            this.setState({email:response.data.data[0].email })
            this.setState({phone:response.data.data[0].phone })
            this.setState({address:response.data.data[0].address })
            this.setState({state:response.data.data[0].state })
            this.setState({suburb:response.data.data[0].suburb })
            this.setState({postcode:response.data.data[0].postcode })
            this.setState({field_of_study:response.data.data[0].field_of_study })
            this.setState({university_name:response.data.data[0].university_name })
            this.setState({student_id:response.data.data[0].student_id })
            this.setState({course_name:response.data.data[0].course_name })
            this.setState({student_visa_type:response.data.data[0].student_visa_type })
            this.setState({student_exp_date:response.data.data[0].student_exp_date })
            this.setState({student_origin_country:response.data.data[0].student_origin_country })
            this.setState({student_city_live:response.data.data[0].student_city_live })
            this.setState({created_at:response.data.data[0].created_at.substring(0, 10) })
            
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

    
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Student Profile" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            
                            <Col lg={12}>
                            <Card>
                                    <CardBody>
                                        <h4 className="card-title">Student Profile</h4>
                                        
                                        
                                        <div className="table-responsive">
                                            <Table className="mb-0">
        
                                                
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td>Name</td>
                                                        <td>{this.state.fname} {this.state.lname}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Email</td>
                                                        <td>{this.state.email}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Phone</td>
                                                        <td>{this.state.phone}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Address</td>
                                                        <td>{this.state.address}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>State</td>
                                                        <td>{this.state.state}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Suburb</td>
                                                        <td>{this.state.suburb}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Postcode</td>
                                                        <td>{this.state.postcode}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Field Of Study</td>
                                                        <td>{this.state.field_of_study}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>University Name</td>
                                                        <td>{this.state.university_name}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Student Id</td>
                                                        <td>{this.state.student_id}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Student Visa Exp Date</td>
                                                        <td>{this.state.student_exp_date}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Student Visa Type</td>
                                                        <td>{this.state.student_visa_type}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Course Name</td>
                                                        <td>{this.state.course_name}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Student Origin Country</td>
                                                        <td>{this.state.student_origin_country}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Student City Live</td>
                                                        <td>{this.state.student_city_live}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Created at</td>
                                                        <td>{this.state.created_at}</td>
                                                        
                                                    </tr>

                                                    
                                                </tbody>
                                            </Table>
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

export default withRouter(StudentViewPage) ;

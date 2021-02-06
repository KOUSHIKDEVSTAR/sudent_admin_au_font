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





class ProfileViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : SITE_NAME, link : "#" },
                { title : "User Profile", link : "#" },
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
            // console.log(response.data.data[0]);
            this.setState({userID:response.data.data[0].id })
            this.setState({fname:response.data.data[0].fname })
            this.setState({lname:response.data.data[0].lname })
            this.setState({email:response.data.data[0].email })
            this.setState({phone:response.data.data[0].phone })
            this.setState({company_name:response.data.data[0].company_name })
            this.setState({company_address:response.data.data[0].company_address })
            this.setState({company_about:response.data.data[0].company_about })
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

                        <Breadcrumbs title="User Profile" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            
                            <Col lg={12}>
                            <Card>
                                    <CardBody>
                                        <h4 className="card-title">User Profile</h4>
                                        
                                        
                                        <div className="table-responsive">
                                            <Table className="mb-0">
        
                                                
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Name</td>
                                                        <td>{this.state.fname} {this.state.lname}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Email</td>
                                                        <td>{this.state.email}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Phone</td>
                                                        <td>{this.state.phone}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Company Name</td>
                                                        <td>{this.state.company_name}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Company Address</td>
                                                        <td>{this.state.company_address}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Company About</td>
                                                        <td>{this.state.company_about}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
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

export default withRouter(ProfileViewPage) ;

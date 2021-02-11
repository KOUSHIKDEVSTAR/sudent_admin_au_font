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

const optionGroup = (opt=[])=>{ return [
	{
		label: "No Parent",
		options: [
			{ label: "Default", value: null}
		]
	},
	{
		label: "Parent Category",
		options: opt 
	}]
}


//-------------------------------------------------------------
//  edit category component
//-------------------------------------------------------------
const FoodViewPage = (props)=> {

    let history = useHistory();
    const [state, setState] = useState({
        selectedGroup: { label: "Default", value: null}, 
        parentCategory: [],
        name: '' 
    })
    const [job_post_id , setjob_post_id ] = useState(props.location.data.job_post_id );
    const [job_post_title, setjob_post_title] = useState(props.location.data.job_post_title);
    const [job_post_content, setjob_post_content] = useState(props.location.data.job_post_content);
    const [job_address, setjob_address] = useState(props.location.data.job_address);
    const [job_category, setjob_category] = useState(props.location.data.job_category);
    const [job_type, setjob_type] = useState(props.location.data.job_type);
    const [job_level, setjob_level] = useState(props.location.data.job_level);
    const [closes_date, setcloses_date] = useState(props.location.data.closes_date);
    const [salary, setsalary] = useState(props.location.data.salary);
    

    // breadcrum
    const [breadcrumbItems, setbreadcrumbItems] = useState([
        { title : SITE_NAME, link : "#" },
        { title : "Food View", link : "#" },
    ])

    useEffect(() => {
        checkUserAuthenticity().then(data =>{            
            if(!data){
                history.replace('/login');
            }
        }).catch(err => {
            console.log('sdfsdf fdsf  ', err);
        });

       
        
    }, []);



    
   

        return (
            <React.Fragment>
            <div className="page-content">
                <Container fluid>

                <Breadcrumbs title="Food View" breadcrumbItems={breadcrumbItems}/>

                <Row>
                    <Col xs={12}>
                    <Card>
                                    <CardBody>
                                        <h4 className="card-title">Food View</h4>
                                        
                                        
                                        <div className="table-responsive">
                                            <Table className="mb-0">
        
                                                
                                                <tbody>
                                                    <tr>
                                                        <td>Title</td>
                                                        <td>{job_post_title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{job_post_content}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job Location</td>
                                                        <td>{job_address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job category</td>
                                                        <td>{job_category}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job type</td>
                                                        <td>{job_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job level</td>
                                                        <td>{job_level}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Closes date</td>
                                                        <td>{closes_date}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Salary</td>
                                                        <td>{salary}</td>
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
        )
    }


export default withRouter(FoodViewPage);

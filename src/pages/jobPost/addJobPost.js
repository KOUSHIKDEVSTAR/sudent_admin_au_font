import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, CustomInput,Button, Alert,InputGroupAddon} from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import Axios from 'axios';
import { BASE_URL, SITE_NAME } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';


  



const AddJobPostPage = (props)=> {                                                                                                                    

    let history = useHistory();
    
    const [rows, setRows] = useState([]);
    // const [allUser, setAllUser] = useState([]);
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const deleteID = useRef(null);

    const [breadcrumbItems, setbreadcrumbItems] = useState([
        { title : SITE_NAME, link : "#" },
        { title : "Student List", link : "#" },
    ])

    useEffect(()=>{
        checkUserAuthenticity().then(data =>{            
            if(!data){
                history.replace('/login');
            }
        }).catch(err => {
            console.log('sdfsdf fdsf  ', err);
        })

      
    }, []);

    

     // form submit
     const handleSubmit = async (event, values)=> {
        console.log(values);
        // Axios.post(`${BASE_URL}users/addUser`, {
        //     email: values.email,
        //     address:values.address,
        //     password:values.password,
        //     first_name:values.first_name,
        //     last_name:values.last_name,
        //     mobile:values.mobile,
        //     role:values.role
            
            
    
            
        // })
        // .then(response => {
    
        //     //201=User already registered
        //     if(response.data===201){
        //         showToast('Warning', 'User already registered'); 
        //         
                // props.history.push('/addFoodCoupons');
        //     }else{
        //         showToast('Success', 'Update Success'); 
        //         props.history.push('/addFoodCoupons');
        //     }
            
        // })
        // .catch(error =>{
        //     console.log(error)
        // })
        
    }
   

        return (
            <React.Fragment>
            <div className="page-content">
                <Container fluid>

                <Breadcrumbs title="Foof Coupons Add" breadcrumbItems={breadcrumbItems}/>

                <Row>
                    <Col xs={12}>
                        <Card>
                        <CardBody>
                            <AvForm onValidSubmit={handleSubmit}>

                                <Label>Job Post Title</Label>
                                <AvField
                                    name="job_post_title"
                                    placeholder="Job Post Title"
                                    type="text"
                                    errorMessage="Job Post Title"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />

                                

                                <Label>Job Post Content</Label>
                                <AvField
                                    name="description"
                                    placeholder="Enter Description"
                                    type="textarea"
                                    errorMessage="Enter Description"
                                    validate={{ required: { value: true }, maxLength: {value: 260} }}
                                />
                                

                                <FormGroup className="mb-0">
                                    <div>
                                        <Button type="submit" color="primary" className="mr-1">
                                            Submit
                                        </Button>
                                    </div> 
                                </FormGroup>

                                </AvForm>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>

                

                </Container> 
            </div>
        </React.Fragment>
        )
}


export default withRouter(AddJobPostPage);
            
import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, CustomInput,Button, Alert,InputGroupAddon} from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import Axios from 'axios';
import { BASE_URL, SITE_NAME } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';
import slugify from 'react-slugify';

  



const EditCategoryPage = (props)=> {                                                                                                                    

    let history = useHistory();
    
    const [rows, setRows] = useState([]);
    // const [allUser, setAllUser] = useState([]);
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [editData, setEditData] = useState(props.location.data);
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

        // console.log(props.location.data);
      
    }, []);

    

     // form submit
     const handleSubmit = async (event, values)=> {
        // console.log(values);
        
        Axios.post(`${BASE_URL}category-admin//categoryEdit`, {
            title: values.title,
            id:values.id,
            
   
        })
        .then(response => {
    
            //201=User already registered
            if(response.data===400){
                showToast('Warning', 'Error To Update Category'); 
                props.history.push('/categoryList');
            }else{
                showToast('Success', 'Update Category Success'); 
                props.history.push('/categoryList');
            }
            
        })
        .catch(error =>{
            console.log(error)
        })
        
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

                                <Label>Title</Label>
                                <AvField
                                    name="title"
                                    placeholder="Enter Food Coupons Title"
                                    type="text"
                                    value={editData.title}
                                    errorMessage="Enter Food Coupons Title"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <AvField
                                    name="id"
                                    placeholder="Enter Food Coupons Title"
                                    type="hidden"
                                    value={editData.id}
                                    errorMessage="Enter Food Coupons Title"
                                   
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


export default withRouter(EditCategoryPage);
            
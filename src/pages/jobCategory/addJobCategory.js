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

  



const AddCategoryPage = (props)=> {                                                                                                                    

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
        // console.log(values);
        var post_slug= slugify(values.post_title);
        Axios.post(`${BASE_URL}category/addCategory`, {
            coupon_price: values.coupon_price,
            address:values.address,
            post_content:values.post_content,
            post_title:values.post_title,
            coupon_tag_line:values.coupon_tag_line,
            post_slug:post_slug
   
        })
        .then(response => {
    
            //201=User already registered
            if(response.data===400){
                showToast('Warning', 'Error To Add Coupons'); 
                props.history.push('/addCategory');
            }else{
                showToast('Success', 'Add Success'); 
                props.history.push('/CategoryList');
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

                                <Label>Food Coupons Title</Label>
                                <AvField
                                    name="post_title"
                                    placeholder="Enter Food Coupons Title"
                                    type="text"
                                    errorMessage="Enter Food Coupons Title"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <Label>Food Coupons Tag Line</Label>
                                <AvField
                                    name="coupon_tag_line"
                                    placeholder="Enter Food Coupons Tag Line"
                                    type="text"
                                    errorMessage="Enter Food Coupons Tag Line"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <Label>Food Coupons Price</Label>
                                <AvField
                                    name="coupon_price"
                                    placeholder="Enter Food Coupons Price"
                                    type="text"
                                    errorMessage="Enter Food Coupons Price"
                                    validate={{ required: { value: true }, maxLength: {value: 5} }}
                                />

                                <Label>Description</Label>
                                <AvField
                                    name="post_content"
                                    placeholder="Enter Description"
                                    type="textarea"
                                    errorMessage="Enter Description"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
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


export default withRouter(AddCategoryPage);
            
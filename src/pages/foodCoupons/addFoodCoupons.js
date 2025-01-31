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

  



const AddFoodCoupousPage = (props)=> {                                                                                                                    

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
        var post_slug= slugify(values.post_title);
        Axios.post(`${BASE_URL}food-coupons-admin/addFoodCoupons`, {
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
                props.history.push('/addFoodCoupons');
            }else{
                showToast('Success', 'Add Success'); 
                props.history.push('/foodCouponsList');
            }
            
        })
        .catch(error =>{
            console.log(error)
        })
        
    }


    const onselectImage = (e)=>{
        console.log(e.target.files);
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
                                    validate={{ required: { value: true } }}
                                />
                                <Label>Food Coupons Tag Line</Label>
                                <AvField
                                    name="coupon_tag_line"
                                    placeholder="Enter Food Coupons Tag Line"
                                    type="text"
                                    
                                    
                                />
                                <Label>Food Coupons Price</Label>
                                <AvField
                                    name="coupon_price"
                                    placeholder="Enter Food Coupons Price"
                                    type="text"
                                    errorMessage="Enter Food Coupons Price"
                                    validate={{ required: { value: true }}}
                                />

                                <Label>Description</Label>
                                <AvField
                                    name="post_content"
                                    placeholder="Enter Description"
                                    type="textarea"
                                    errorMessage="Enter Description"
                                    validate={{ required: { value: true } }}
                                />
                                <CardBody>
                                        <h4 className="card-title">File browser</h4>
                                        <p className="card-title-desc">The file input is the most gnarly of the bunch and requires additional JavaScript if you’d like to hook them up with functional <em>Choose file…</em> and selected file name text.</p>
                                        <div className="custom-file">
                                            <CustomInput type="file" className="custom-file-input" id="customFile" onChange={(e)=>{onselectImage(e)}} multiple/>
                                            <Label className="custom-file-label" htmlFor="customFile">Choose file</Label>
                                        </div>
                                    </CardBody>
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


export default withRouter(AddFoodCoupousPage);
            
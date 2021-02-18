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

  



const AddAccomodationPage = (props)=> {                                                                                                                    

    let history = useHistory();
    
    const [rows, setRows] = useState([]);
    
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [productImagesMulti, setproductImagesMulti] = useState(null);
   
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
        console.log( this.productImagesMulti);
        // var post_slug= slugify(values.post_title);
        // Axios.post(`${BASE_URL}category-admin//addCategory`, {
        //     coupon_price: values.coupon_price,
        //     address:values.address,
        //     post_content:values.post_content,
        //     post_title:values.post_title,
        //     coupon_tag_line:values.coupon_tag_line,
        //     post_slug:post_slug
   
        // })
        // .then(response => {
    
        //     //201=User already registered
        //     if(response.data===400){
        //         showToast('Warning', 'Error To Add Coupons'); 
        //         props.history.push('/addCategory');
        //     }else{
        //         showToast('Success', 'Add Success'); 
        //         props.history.push('/CategoryList');
        //     }
            
        // })
        // .catch(error =>{
        //     console.log(error)
        // })
        
    }
    const onselectImage = (e)=>{
        // console.log(e.target.files);
        const file = e.target.files;
        this.productImagesMulti = file;
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
                                    placeholder="Enter Title"
                                    type="text"
                                    errorMessage="Enter Title"
                                    validate={{ required: { value: true } }}
                                />
                                <Label>Property Short Description</Label>
                                <AvField
                                    name="post_short_content"
                                    placeholder="Enter Property Short Description"
                                    type="text"
                                    errorMessage="Enter Property Short Description"
                                    validate={{ required: { value: true } }}
                                />
                                <Label>Property Description</Label>
                                <AvField
                                    name="post_content"
                                    placeholder="Enter Property Description"
                                    type="text"
                                    errorMessage="Enter Property Description"
                                    validate={{ required: { value: true } }}
                                />

                                <Label>Address</Label>
                                <AvField
                                    name="address"
                                    placeholder="Enter Address"
                                    type="textarea"
                                    errorMessage="Enter Address"
                                    validate={{ required: { value: true } }}
                                />  
                                <Label>Accomodation type</Label>
                                <select class="form-control"  id="accomodation_type" name="accomodation_type" >
                                    <option value=" ">Select Accomodation type</option>
                                    <option value="House">House</option>
                                    <option value="Room">Room</option>
                                    <option value="Flats">Flats</option>
                                    <option value="Villa">Villa</option>
                                </select>

                                <label for="fname">Bed Room number only</label>
                                <AvField
                                
                                    name="bedroom"
                                    placeholder="Bed Room number only"
                                    type="number"
                                    errorMessage="Enter Food Coupons Price"
                                    validate={{ required: { value: true } }}
                                />
                                <label for="fname">Bathroom number only</label>
                                <AvField
                                
                                    name="bathroom"
                                    placeholder="Bathroom number only"
                                    type="number"
                                    errorMessage="Bathroom number only"
                                    validate={{ required: { value: true } }}
                                />
                                <label for="fname">Parking area number only</label>
                                <AvField
                                
                                    name="parking_area"
                                    placeholder="Parking area number only"
                                    type="number"
                                    errorMessage="Parking area number only"
                                    validate={{ required: { value: true } }}
                                />
                                <label for="fname">Floor Area</label>
                                <AvField
                                
                                    name="floor_area"
                                    placeholder="197m²"
                                    type="text"
                                    errorMessage="Enter Floor Area"
                                    validate={{ required: { value: true } }}
                                />
                                <label for="fname">Accomodation price</label>
                                <AvField
                                
                                    name="accomodation_price"
                                    placeholder="$13,319 / month*"
                                    type="text"
                                    errorMessage="Enter Accomodation price"
                                    validate={{ required: { value: true } }}
                                />
                                <CardBody>
                                        <h4 className="card-title">File browser</h4>
                                       
                                        <div className="custom-file">
                                            <CustomInput type="file" className="custom-file-input" name="productImagesMulti" id="customFile" onChange={(e)=>{onselectImage(e)}} multiple/>
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


export default withRouter(AddAccomodationPage);
            
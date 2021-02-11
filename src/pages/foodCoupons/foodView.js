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
    const [foodpostid, setFoodpostid] = useState(props.location.data.food_post_id);
    const [title, setTitle] = useState(props.location.data.title);
    const [description, setDescription] = useState(props.location.data.description);
    const [food_contract, setFood_contract] = useState(props.location.data.food_contract);
    const [restaurants_name, setrestaurants_name] = useState(props.location.data.restaurants_name);
    const [discount, setdiscount] = useState(props.location.data.discount);
    const [discount_code, setdiscount_code] = useState(props.location.data.discount_code);
    const [closes_date, setcloses_date] = useState(props.location.data.closes_date);
    

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
                                                        <td>{title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Food contract</td>
                                                        <td>{food_contract}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Restaurants name</td>
                                                        <td>{restaurants_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Discount</td>
                                                        <td>{discount}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Discount code</td>
                                                        <td>{discount_code}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Closes date</td>
                                                        <td>{closes_date}</td>
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

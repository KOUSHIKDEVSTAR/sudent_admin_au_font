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
const AccomodationViewPage = (props)=> {

    let history = useHistory();
    const [state, setState] = useState({
        selectedGroup: { label: "Default", value: null}, 
        parentCategory: [],
        name: '' 
    })
    const [accomodation_id, setaccomodation_id] = useState(props.location.data.accomodation_id);
    const [title, setTitle] = useState(props.location.data.title);
    const [address, setaddress] = useState(props.location.data.address);
    const [post_content, setpost_content] = useState(props.location.data.post_content);
    const [accomodation_price, setaccomodation_price] = useState(props.location.data.accomodation_price);
    const [accomodation_type, setaccomodation_type] = useState(props.location.data.accomodation_type);
    const [parking_area, setparking_area] = useState(props.location.data.parking_area);
    const [bathroom, setbathroom] = useState(props.location.data.bathroom);
    const [bedroom, setbedroom] = useState(props.location.data.bedroom);
    const [floor_area, setfloor_area] = useState(props.location.data.floor_area);
    

    // breadcrum
    const [breadcrumbItems, setbreadcrumbItems] = useState([
        { title : SITE_NAME, link : "#" },
        { title : "Accomodation View", link : "#" },
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

                <Breadcrumbs title="Accomodation View" breadcrumbItems={breadcrumbItems}/>

                <Row>
                    <Col xs={12}>
                    <Card>
                                    <CardBody>
                                        <h4 className="card-title">Accomodation View</h4>
                                        
                                        
                                        <div className="table-responsive">
                                            <Table className="mb-0">
        
                                                
                                                <tbody>
                                                    <tr>
                                                        <td>Title</td>
                                                        <td>{title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>{address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{post_content}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Price</td>
                                                        <td>{accomodation_price}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{accomodation_type}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking</td>
                                                        <td>{parking_area}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bathroom</td>
                                                        <td>{bathroom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bed Room</td>
                                                        <td>{bedroom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor Area</td>
                                                        <td>{floor_area}</td>
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


export default withRouter(AccomodationViewPage);

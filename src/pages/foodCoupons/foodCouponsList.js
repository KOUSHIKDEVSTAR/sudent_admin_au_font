import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import "../../datatables.scss";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import Axios from 'axios';
import { BASE_URL, SITE_NAME,BASE_URL_IMG } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';


  



const FoodCoupousPage = (props)=> {                                                                                                                    

    let history = useHistory();
    const [columns, setColumns] = useState([
      {
        label: "Sl No.",
        field: "sl_no",
        sort: "asc",
        width: 200
      },
      {
        label: "Image",
        field: "image",
        sort: "asc",
        width: 200
      },
      {
        label: "Coupons title",
        field: "post_title",
        sort: "asc",
        width: 150
      },
      {
        label: "Coupons content",
        field: "post_content",
        sort: "asc",
        width: 200
      },
      {
        label: "Restaurants name",
        field: "restaurants_name",
        sort: "asc",
        width: 200
      },
      {
        label: "Discount",
        field: "discount",
        sort: "asc",
        width: 100
      },
      {
        label: "Discount code",
        field: "discount_code",
        sort: "asc",
        width: 100
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100
      }
    ]);
    const [rows, setRows] = useState([]);
    // const [allUser, setAllUser] = useState([]);
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const deleteID = useRef(null);

    const [breadcrumbItems, setbreadcrumbItems] = useState([
        { title : SITE_NAME, link : "#" },
        { title : "Food List", link : "#" },
    ])

    useEffect(()=>{
        checkUserAuthenticity().then(data =>{            
            if(!data){
                history.replace('/login');
            }
        }).catch(err => {
            console.log('sdfsdf fdsf  ', err);
        })

        getAllData();
    }, []);

    

    const onClickEdit = (id)=> {
      // console.log('EDIT', id);
      props.history.push({pathname: '/foodView', data: id});
  }
  
  const onClickRemove = (id)=> {
      // console.log('REMOVE', id.food_post_id );
      deleteID.current = id;
      setshowConfirmDelete(true);
  }


  const onConfirmAction = ()=> {
    setshowConfirmDelete(false);
    deleteUser(deleteID.current);
  }

  const onCancelAction = ()=> {
    setshowConfirmDelete(false);
  }
  
  const action = (key, id )=>{return [<i className="fa fa-eye" key={key} onClick={()=>{onClickEdit(id )}} style={{fontSize: 18}}></i>, '     ', '     ', <i className="fa fa-trash" key={key+key} style={{fontSize: 18}} onClick={()=> {onClickRemove(id )}}></i>]};

    // getting all User
    const getAllData = async () => {

      try {          
          
        Axios.get(`${BASE_URL}food-coupons-admin/all-food-coupons`, {
            
        }).then(response => {
            console.log(response.data);
            let users = response.data.data;
            let rows = users.map((item, index) => {return {
              sl_no: index+1,
              image:BASE_URL_IMG+'images/'+item.image,
              post_title: item.title,
              post_content: item.description ,
              restaurants_name: item.restaurants_name,
                discount: item.discount+'%',
                discount_code: item.discount_code,
               
                action: action(item.food_post_id , item)
            }});
            setRows(rows);
            //this.setState({userFname:response.data.data[0].first_name })
        }).catch(error=>{
            console.log(error);
        })

      } catch (error) {
          // this.props.showLoader(false);
          console.log('error  :   ', error);
      }

  }


  const deleteUser = async (id) => {
    
    Axios.post(`${BASE_URL}food-coupons-admin/dataDelete`, {
      food_post_id: id.food_post_id
  }).then(response => {
    if(response.data.code==200){
      showToast('Success', 'Delete Success'); 
      getAllData();
      this.props.history.replace('/foodCouponsList');

      
  }else{
    showToast('Warning', 'Delete Error'); 
    this.props.history.replace('/foodCouponsList');
  }
      
      
  }).catch(err =>{
      console.log(err);
  })

}
   

    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Food List" breadcrumbItems={breadcrumbItems}/>

                    <Row>
                        <Col xs={12}>
                            <Card>
                            <CardBody>
                                <MDBDataTable responsive striped bordered data={{columns: columns, rows: rows}} sortable={false}/>
                            </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    { showConfirmDelete ? <SweetAlertConfirm onConfirmAction={onConfirmAction} onCancelAction={onCancelAction}/> : null }

                    </Container> 
                </div>
            </React.Fragment>
        )
}


export default withRouter(FoodCoupousPage);
            
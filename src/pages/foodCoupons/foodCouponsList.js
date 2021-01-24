import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import "../../datatables.scss";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import Axios from 'axios';
import { BASE_URL, SITE_NAME } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';


  



const FoodCoupousPage = (props)=> {                                                                                                                    

    let history = useHistory();
    const [columns, setColumns] = useState([
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
        label: "coupon_price",
        field: "coupon_price",
        sort: "asc",
        width: 200
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100
      },
      // {
      //   label: "Action",
      //   field: "action",
      //   sort: "asc",
      //   width: 100
      // }
    ]);
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

        getAllUsers();
    }, []);

    

    const onClickEdit = (id)=> {
      console.log('EDIT', id);
      props.history.push({pathname: '/#', data: id});
  }
  
  const onClickRemove = (id)=> {
      console.log('REMOVE', id.post_id );
      deleteID.current = id;
      // props.history.push({pathname: '/edit-User', data: {id}});
      setshowConfirmDelete(true);
  }


  const onConfirmAction = ()=> {
    setshowConfirmDelete(false);
    deleteUser(deleteID.current);
  }

  const onCancelAction = ()=> {
    setshowConfirmDelete(false);
  }
  
  const action = (key, post_id )=>{return [<i className="fa fa-edit" key={key} onClick={()=>{onClickEdit(post_id )}} style={{fontSize: 18}}></i>, '     ', '     ', <i className="fa fa-trash" key={key+key} style={{fontSize: 18}} onClick={()=> {onClickRemove(post_id )}}></i>]};

    // getting all User
    const getAllUsers = async () => {

      try {          
          
        Axios.get(`${BASE_URL}food-coupons/all-food-coupons`, {
            
        }).then(response => {
            console.log(response);
            let users = response.data.data;
            let rows = users.map(item => {return {
              post_title: item.post_title,
              post_content: item.post_content,
              coupon_price: item.coupon_price,
                status: item.status,
               
                action: action(item.post_id , item)
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
    
  //   Axios.post(`${BASE_URL}users/userdelete`, {
  //     id: id
  // }).then(response => {
  //   if(response.data.code==200){
  //     showToast('Success', 'Delete Success'); 
  //     this.props.history.replace('/userList');

      
  // }else{
  //   showToast('Warning', 'User already registered'); 
  //   this.props.history.replace('/userList');
  // }
      
      
  // }).catch(err =>{
  //     console.log(err);
  // })

}
   

    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Vendor List" breadcrumbItems={breadcrumbItems}/>

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
            
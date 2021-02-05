import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import "../../datatables.scss";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import SweetAlertConfirmStatus from '../../config/sweet-alert/sweet-alert-status';

import Axios from 'axios';
import { BASE_URL, SITE_NAME } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';



  



const UserListPage = (props)=> {                                                                                                                    

    let history = useHistory();
    const [columns, setColumns] = useState([
      
      {
        label: "Sl No.",
        field: "sl_no",
        sort: "asc",
        width: 200
      },
      {
        label: "First name",
        field: "first_name",
        sort: "asc",
        width: 150
      },
      {
        label: "Last name",
        field: "last_name",
        sort: "asc",
        width: 200
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 200
      },
      {
        label: "Phone",
        field: "mobile",
        sort: "asc",
        width: 100
      },
      {
        label: "Username",
        field: "address",
        sort: "asc",
        width: 100
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100
      }
    ]);
    const [rows, setRows] = useState([]);
    // const [allUser, setAllUser] = useState([]);
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [showConfirmStatus, setshowConfirmStatus] = useState(false);
    const deleteID = useRef(null);
    const statusID = useRef(null);

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
      
      props.history.push({pathname: '/userEdit', data: id});
  }
  
  const onClickRemove = (id)=> {
     
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

  const onClickStatus = (id)=> {
     
    statusID.current = id;
    setshowConfirmStatus(true);
  }
  const onConfirmActionStatus = ()=> {
    setshowConfirmStatus(false);
    statusUser(statusID.current);
  }

  const onCancelActionStatus = ()=> {
    setshowConfirmStatus(false);
  }


  
  
  const action = (key, id)=>{return [<i className="fa fa-edit" key={key} onClick={()=>{onClickEdit(id)}} style={{fontSize: 18}}></i>, '     ', '     ', <i className="fa fa-trash" key={key+key} style={{fontSize: 18}} onClick={()=> {onClickRemove(id)}}></i>]};

  const status = (key, id)=>{
    if(id.status == '1'){
      return [<i className=" fas fa-check-circle" key={key} onClick={()=>{onClickStatus(id)}} style={{fontSize: 18}}></i>]
    }else if(id.status == '0'){
      return [<i className="  fas fa-chess-queen" key={key} onClick={()=>{onClickStatus(id)}} style={{fontSize: 18}}></i>]
    }    
  };
    // getting all User
    const getAllUsers = async () => {

      try {          
          
        Axios.get(`${BASE_URL}users/all-users`, {
            //id: await getDataFromLocalStorage('logUserId')
        }).then(response => {
            
            let users = response.data.data;
            let rows = users.map((item, index) => {return {
              sl_no: index+1,
                first_name: item.fname,
                last_name: item.lname,
                email: item.email,
                mobile: item.phone,
                address: item.username,
                action: action(item.id, item),
                status: status(item.id, item)
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
    
    Axios.post(`${BASE_URL}users/userdelete`, {
      id: id
  }).then(response => {
    if(response.data.code==200){
      showToast('Success', 'Delete Success'); 
      this.props.history.replace('/userList');

      
  }else{
    showToast('Warning', 'User already registered'); 
    this.props.history.replace('/userList');
  }
      
      
  }).catch(err =>{
      console.log(err);
  })

}
   
const statusUser = async (id) => {
    
  Axios.post(`${BASE_URL}users/userStatus`, {
    id: id
}).then(response => {
  if(response.data.code==200){
    showToast('Success', 'Delete Success'); 
    this.props.history.replace('/userList');

    
}else{
  showToast('Warning', 'User already registered'); 
  this.props.history.replace('/userList');
}
  
}).catch(err =>{
    console.log(err);
})

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
                    { showConfirmStatus ? <SweetAlertConfirmStatus onConfirmActionStatus={onConfirmActionStatus} onCancelAction={onCancelActionStatus}/> : null }
                    </Container> 
                </div>
            </React.Fragment>
        )
}


export default withRouter(UserListPage);
            
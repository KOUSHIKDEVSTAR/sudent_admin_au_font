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


  



const CategoryPage = (props)=> {                                                                                                                    

    let history = useHistory();
    const [columns, setColumns] = useState([
      
      {
        label: "Sl No.",
        field: "sl_no",
        sort: "asc",
        width: 200
      },
      {
        label: "Title",
        field: "post_title",
        sort: "asc",
        width: 150
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
      // console.log('EDIT', id);
      props.history.push({pathname: '/editCategory', data: id});
  }
  
  const onClickRemove = (id)=> {
      // console.log('REMOVE', id.id );
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
  
  const action = (key, id )=>{return [<i className="fa fa-edit" key={key} onClick={()=>{onClickEdit(id )}} style={{fontSize: 18}}></i>, '     ', '     ']};

    // getting all User
    const getAllUsers = async () => {

      try {          
          
        Axios.get(`${BASE_URL}category-admin//all-category`, {
            
        }).then(response => {
            
            let users = response.data.data;
            let rows = users.map((item, index) => {return {
              sl_no: index+1,
              post_title: item.title,
              
               
                action: action(item.id , item)
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
    // console.log('jhksfgjkjhkfds',id.id);
    
    Axios.post(`${BASE_URL}category-admin//categorydelete`, {
      id: id.id
  }).then(response => {
    if(response.data.code==200){
      showToast('Success', 'Delete Success'); 
      this.props.history.replace('/categoryList');

      
  }else{
    showToast('Error', 'Delete Not Done'); 
    this.props.history.replace('/categoryList');
  }
      
      
  }).catch(err =>{
      console.log(err);
  })

}
   

    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Category List" breadcrumbItems={breadcrumbItems}/>

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


export default withRouter(CategoryPage);
            
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


const JobPostPage = (props)=> {

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
        field: "job_post_title",
        sort: "asc",
        width: 150
      },
      {
        label: "Job content",
        field: "job_post_content",
        sort: "asc",
        width: 200
      },

      {
        label: "Job Location",
        field: "job_address",
        sort: "asc",
        width: 100
      },
      {
        label: "Job Type",
        field: "job_type",
        sort: "asc",
        width: 100
      },
      {
        label: "Job created at",
        field: "created_at",
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
        { title : "Job List", link : "#" },
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
      console.log('EDIT', id);
      props.history.push({pathname: '/jobView', data: id});
  }

  const onClickRemove = (id)=> {
      console.log('REMOVE', id.job_post_id  );
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

  const action = (key, job_post_id  )=>{return [<i className="fa fa-eye" key={key} onClick={()=>{onClickEdit(job_post_id  )}} style={{fontSize: 18}}></i>, '     ', '     ', <i className="fa fa-trash" key={key+key} style={{fontSize: 18}} onClick={()=> {onClickRemove(job_post_id  )}}></i>]};

    // getting all User
    const getAllData = async () => {

      try {

        Axios.get(`${BASE_URL}job-post-admin/all-job-post`, {

        }).then(response => {

            let users = response.data.data;
            let rows = users.map((item, index)=> {return {
              sl_no: index+1,
              job_post_title: item.job_post_title,
              job_post_content: item.job_post_content,

                job_address: item.job_address,
                job_type: item.job_type,
                created_at: item.created_at.substring(0,10),

                action: action(item.job_post_id  , item)
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
    
    Axios.post(`${BASE_URL}job-post-admin/dataDelete`, {
      job_post_id : id.job_post_id
  }).then(response => {
    if(response.data.code==200){
      showToast('Success', 'Delete Success');
      getAllData();
      this.props.history.replace('/jobPostList');
  }else{
    showToast('Warning', 'Delete Error');
    this.props.history.replace('/jobPostList');
  }


  }).catch(err =>{
      console.log(err);
  })

}


    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Job List" breadcrumbItems={breadcrumbItems}/>

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


export default withRouter(JobPostPage);

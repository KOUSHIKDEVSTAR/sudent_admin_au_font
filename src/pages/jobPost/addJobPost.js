import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBDataTable } from "mdbreact";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, CustomInput,Button, Alert,InputGroupAddon} from "reactstrap";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SweetAlertConfirm from '../../config/sweet-alert/sweet-alert';
import Axios from 'axios';
import { BASE_URL, SITE_NAME } from '../../config/static';
import { showToast } from '../../config/toastr/toast';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';
import slugify from 'react-slugify';
import Select from "react-select";




const AddJobPostPage = (props)=> {

    let history = useHistory();

    const [selectedGroup, setSelectedGroup] = useState({ label: "Select...", value: null});
    const [categoryOptions, setCategoryOptions] = useState([{ label: "Select...", value: null}]);

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

        getAllJobCategory();
    }, []);



     // form submit
     const handleSubmit = async (event, values)=> {
        //console.log(values);
        let UserId = '1';
        var job_post_slug= slugify(values.job_post_title);
        Axios.post(`${BASE_URL}job-post/addJobPost`, {
            job_post_title: values.job_post_title,
            author:UserId,
            job_post_content:values.job_post_content,
            job_address:values.job_address,
            job_category:selectedGroup.value,
            job_post_slug:job_post_slug,
            job_type:values.job_type,
            job_tag:values.job_tag,
            salary_type:values.salary_type,
            salary_details:values.salary_details

        })
        .then(response => {

            //201=User already registered
            if(response.data===201){
                showToast('Warning', 'Job already registered');

                props.history.push('/addJobPost');
            }else{
                showToast('Success', 'Add Job Success');
                props.history.push('/jobPostList');
            }

        })
        .catch(error =>{
            console.log(error)
        })

    }

    const getAllJobCategory = async () => {

        try {          
            
          Axios.get(`${BASE_URL}job-category/all-job-category`, {
              
          }).then(response => {
              
              let jobCategory = response.data.data;
              let modifiedArray = jobCategory.map((item)=>{
                return { label: item.job_category_title, value: item.job_category_id};
              })
              modifiedArray.unshift({ label: "Select...", value: null});
                //  console.log('All Cate    ',jobCategory);
                setCategoryOptions(modifiedArray);
              
          }).catch(error=>{
              console.log(error);
          })
  
        } catch (error) {
            
            console.log('error  :   ', error);
        }
  
    }

    //-------------------------------------------------------------
//  category select onchange method
//-------------------------------------------------------------
	const handleSelectGroup = selectedGroup => {
        console.log('drop down change   :  ',  selectedGroup);
		setSelectedGroup(selectedGroup);
    };


        return (
            <React.Fragment>
            <div className="page-content">
                <Container fluid>

                <Breadcrumbs title="Job Add" breadcrumbItems={breadcrumbItems}/>

                <Row>
                    <Col xs={12}>
                        <Card>
                        <CardBody>
                            <AvForm onValidSubmit={handleSubmit}>

                                <Label>Job Post Title</Label>
                                <AvField
                                    name="job_post_title"
                                    placeholder="Job Post Title"
                                    type="text"
                                    errorMessage="Job Post Title"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />



                                <Label>Job Post Content</Label>
                                <AvField
                                    name="job_post_content"
                                    placeholder="Enter Description"
                                    type="textarea"
                                    errorMessage="Enter Description"
                                    validate={{ required: { value: true }, maxLength: {value: 260} }}
                                />

                                <Label>Job Adress</Label>
                                <AvField
                                    name="job_address"
                                    placeholder="Enter job address"
                                    type="textarea"
                                    errorMessage="Enter job address"
                                    validate={{ required: { value: true }, maxLength: {value: 160} }}
                                />

                                <Label>Job Category</Label>
                               
                               
                                <Select
                                    value={selectedGroup}
                                    onChange={handleSelectGroup}
                                    options={categoryOptions}
                                    classNamePrefix="select2-selection"
                                   
                                />
                                <Label>Job Type</Label>
                                <AvField
                                    name="job_type"
                                    placeholder="Job Type"
                                    type="text"
                                    errorMessage="Job Type"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <Label>Job Tag</Label>
                                <AvField
                                    name="job_tag"
                                    placeholder="Job Tag"
                                    type="text"
                                    errorMessage="Job Tag"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <Label>Salary Type</Label>
                                <AvField
                                    name="salary_type"
                                    placeholder="Salary Type"
                                    type="text"
                                    errorMessage="Salary Type"
                                    validate={{ required: { value: true }, maxLength: {value: 60} }}
                                />
                                <Label>Salary Details</Label>
                                <AvField
                                    name="salary_details"
                                    placeholder="Salary details"
                                    type="text"
                                    errorMessage="Salary details"
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


export default withRouter(AddJobPostPage);

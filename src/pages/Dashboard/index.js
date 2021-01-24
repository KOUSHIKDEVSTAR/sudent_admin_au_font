import React, { Component, useState, useEffect } from 'react';
import { Container } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { checkUserAuthenticity } from '../../helpers/checkUserAuthenticity/checkAuthenticity';
import { getDataFromLocalStorage } from '../../config/localStorage/localStorageHelperMethords';
import { SITE_NAME } from '../../config/static';

const StarterPage = (props)=> {

    let history = useHistory();
   const [breadcrumbItems, setbreadcrumbItems] = useState([
    { title : SITE_NAME, link : "#" },
    { title : "Dashboard", link : "#" },
    ])

    useEffect(()=>{
        checkUserAuthenticity().then(data =>{            
            if(!data){
                history.replace('/login');
            }
        }).catch(err => {
            console.log('sdfsdf fdsf  ', err);
        })

       // getuserdata();
    }, []);


    // const getuserdata = async ()=>{
    //     let ud  = await getDataFromLocalStorage('logUserEmail');
    //     console.log('jhsgdfjhgjhsgdjhfg' , ud);
    // }
   

    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                    
                    </Container> 
                </div>
            </React.Fragment>
        )
}


export default StarterPage;
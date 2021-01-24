import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";



function SweetAlertConfirm(props) {
    return (
        // <div>
        <SweetAlert
            title="Are you sure?"
            warning
            showCancel
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() =>{ props.onConfirmAction() }}
            onCancel={() =>{ props.onCancelAction() }}
            >
            You won't be able to revert this!
        </SweetAlert>
        // </div>
    )
}

export default SweetAlertConfirm;
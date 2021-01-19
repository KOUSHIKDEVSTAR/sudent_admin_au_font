// toast 
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'


const showEasing = "swing";
const hideEasing = "linear";
const showMethod = "fadeIn";
const hideMethod = "fadeOut";

const showDuration = 300;
const hideDuration = 500;
const timeOut = 3000;
const extendedTimeOut = 1000;


toastr.options = {
    // positionClass : positionClass,
    timeOut,
    extendedTimeOut,
    closeButton : true,
    // debug : debug,
    // progressBar : progressBar,
    preventDuplicates : true,
    newestOnTop : true,
    showEasing,
    hideEasing,
    showMethod,
    hideMethod,
    showDuration,
    hideDuration
}


export const showToast = (title='', message='', toastType='success')=>{
        if(toastType === "info")
            toastr.info(message,title)
        else if(toastType === "warning")
            toastr.warning(message,title)
        else if(toastType === "error")
            toastr.error(message,title)
        else if(toastType === "success")
            toastr.success(message,title)
}





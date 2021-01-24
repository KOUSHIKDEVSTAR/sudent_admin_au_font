import { getDataFromLocalStorage } from "../../config/localStorage/localStorageHelperMethords";




export const checkUserAuthenticity = async () => {

    let u = await getDataFromLocalStorage('logUserEmail');
    let t = await getDataFromLocalStorage('logUserToken');

  
	if(u && t){
		return true;
    } else{
        return false;
    }
}
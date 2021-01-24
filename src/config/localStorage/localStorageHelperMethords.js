import { USER_AUTH_DATA_STORE } from "./localStorage";

export const getDataFromLocalStorage = (key)=>{
    return USER_AUTH_DATA_STORE.getItem(key);
}

export const setDataToLocalStorage = (key, value)=>{
    return USER_AUTH_DATA_STORE.setItem(key, JSON.stringify(value));
}

export const removeAllUserAuthData = ()=>{
    return USER_AUTH_DATA_STORE.clear();
}

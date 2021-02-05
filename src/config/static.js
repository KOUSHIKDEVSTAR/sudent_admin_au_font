export const BASE_URL = () => {
    

    if(process.env.NODE_ENV === 'development'){
        console.log('development', 'http://localhost:9000');
        return 'http://localhost:9000';
      }else if(process.env.NODE_ENV === 'production'){
        console.log('production', 'https://jungle99.herokuapp.com');
        return "http://3.25.66.75:9000/";
      }else if(process.env.NODE_ENV === 'test'){
        console.log('test');
        return 'http://localhost:9000';
      }else{
        console.log('else', 'http://localhost:9000');
        return 'http://localhost:9000';
      }
};
export const SITE_NAME = "Nazox";




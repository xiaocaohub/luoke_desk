import axios from "axios";
import {getStorageFn} from "../utils/localStorage";
let instance = axios.create({
   
       baseURL: "http://116.62.207.126:55121",
    
        // baseURL: "http://116.62.207.126:55121",
    // baseURL: "http://localhost:18001",
  //  baseURL:"http://localhost",
//    baseURL: "https://test.luockoo.cn",
 
    //  baseURL: "http://116.62.207.126:55121",
    
    
    // baseURL: "https://www.luockoo.cn",
 
    // baseURL: "http://localhost:3000", 
    timeout: 15000
})

instance.interceptors.request.use(
    
    config => { 

        let token = getStorageFn("token");

        config.headers.Authorization = "12345";
        config.headers.token = token || "123";
        return config;
    },
    err => {    

        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response=> {
        return response;
    },
    err => {
        return Promise.reject(err)
    }
)


export default instance;
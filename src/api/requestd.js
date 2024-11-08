import axios from "axios";
import {getStorageFn} from "../utils/localStorage";
let instance = axios.create({
    
        // baseURL: "http://116.62.207.126:55121",
    
     baseURL: "https://test.luockoo.cn",
    // baseURL: "https://www.luockoo.cn",
    // baseURL: "http://localhost:3000", 
    timeout: 15000
})
instance.interceptors.request.use(
    
    config => {
        let token = getStorageFn("token");
        config.headers.Authorization = "12345";
        config.headers.token = token || "123";
        // config.headers['Content-Type'] = "application/x-www-form-urlencoded";

        config.headers.responseType = 'blob';
        // config.headers['Content-disposition'] = "attachment;filename=a.xlsx";
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response=> {
        console.log("response config")

        console.log(response)
        console.log("response config")
        // if (response.config.responseType == "blob") {
        //     return response;
        // }
        return response;
    },




    err => {
        return Promise.reject(err)
    }
)

export default instance;
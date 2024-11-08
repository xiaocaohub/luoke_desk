import {getStorageFn} from "./localStorage";
import request from "../api/request";
export const setImgAutoHeightFn = function (wrapDiv, img) {
        console.log("wrapDiv")
        let width = wrapDiv.clientWidth;

        let height = parseInt((width * 2)/3);  
        return height;
    }

export const setVedioHeightFn = function (wrapDiv) {
    let width = wrapDiv.clientWidth;
    let height =  (width * 9) /16;
    return height;
}

export const scrollTopFn = function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

export const  checkTokenFn = ()=> {

    let loginStatus = "";
    let token = getStorageFn("token");
    let formData = new FormData();
    formData.append("api", "app.login.token");          
    formData.append("storeId", 1);
    formData.append("storeType", 6);
    formData.append("access_id", token);
    request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    }).then((res)=> {
        console.log("loginStatus router----------")

        console.log(res)


        console.log("loginStatus res")
        let loginStatus = res.data.data.login_status;
        if (!loginStatus == 1) {
            window.location.href = '/login';
        }
       
    })
}

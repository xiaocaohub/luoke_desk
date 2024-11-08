import { useEffect } from "react";
import {Route, useLocation, Redirect } from "react-router-dom";
import { getStorageFn } from "../../utils/localStorage";
import request from "../../api/request";
import Layout from "../../pages/Layout";

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
    loginStatus = res.data.data.login_status;
})

function RouterAuth (props) {

    let _this = this;    
    let { routes } = props;
    let location = useLocation();
    let {pathname} = location;
    let targetRoute = routes.find((item)=>{
        return item.path.replace(/\s*/g, "") === pathname;
    })
 





    console.log("targetRoute")
    console.log(targetRoute)
    console.log("targetRoute")
    if (targetRoute) {
    
        let {component} = targetRoute;
    
        let {layoutFlag} = targetRoute;
        console.log("layoutFlag")
        console.log(layoutFlag)
        console.log("layoutFlag")
        if (targetRoute.auth) {
            if (loginStatus == 1) {
                return (<Route path={pathname} exact component={ component }></Route>)
            } else {
                return (<Redirect to="/login"></Redirect>)
            } 
        } else {
            return (<Route path={pathname} exact component={ component }></Route>)
        }
    }
}

export default RouterAuth;
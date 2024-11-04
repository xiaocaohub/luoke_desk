import Login from "../pages/Login";
import Register from "../pages/Register";
import InfoAgreement from "../pages/InfoAgreement";
import LuoKeAgreement from "../pages/LuoKeAgreement";
import PeopleHome from "../pages/PeopleHome";

import PeopleOrderList from "../pages/PeopleOrderList";
import PeopleOrderListPage from "../pages/PeopleOrderListPage";
import PeopleOrderDetail from "../pages/PeopleOrderDetail";
import Shop from "../pages/Shop";
import ShopInfo from "../pages/ShopInfo";

let routes = [
    {path:"/login", name:"Login", component: Login},
    {path:"/register", name:"Register", component: Register},
    {path:"/luoke/agreement", name:"LuoKeAgreement", component: LuoKeAgreement},
    {path:"/info/agreement", name:"InfoAgreement", component: InfoAgreement},

    {path:"/people", name:"PeopleHome", component: PeopleHome},


    {path:"/people_order_list", name:"PeopleOrderListPage", component: PeopleOrderListPage},
    {path:"/people_order_detail", name:"PeopleOrderDetail", component: PeopleOrderDetail}
    
]
export default routes;
       
                      
                      
                     
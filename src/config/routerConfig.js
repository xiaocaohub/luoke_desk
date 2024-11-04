import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../pages/Layout";

import RecommendeGood from "../pages/RecommendeGood";

import ProductRoom from "../pages/ProductRoom";
import ProductRoomDetail from "../pages/ProductRoomDetail";
import SeriesSet from "../pages/SeriesSet";
import SeriesSetList from "../pages/SeriesSetList";
import Artist from "../pages/Artist";
import ArtistDetail from "../pages/ArtistDetail";
import Cart from "../pages/Cart";
import CheckCart from "../pages/CheckCart";
import Us from "../pages/Us";

import InfoAgreement from "../pages/InfoAgreement";
import LuoKeAgreement from "../pages/LuoKeAgreement";
import Pay from "../pages/Pay";
import Register from "../pages/Register";
import PeopleHome from "../pages/PeopleHome";

import PayOver from "../pages/PayOver";
import PeopleOrderList from "../pages/PeopleOrderList";
import PeopleOrderListPage from "../pages/PeopleOrderListPage";

import PeopleOrderDetail from "../pages/PeopleOrderDetail";
import Shop from "../pages/Shop";
import ShopInfo from "../pages/ShopInfo";

let routes = [
    {path:"/", name:"Home", component: Home, layoutFlag: true},
    {path:"/recommendegood", name:"RecommendeGood", component: RecommendeGood, auth: true, layoutFlag: true},
    {path:"/productroomdetail", name:"ProductRoomDetail", component: ProductRoomDetail, layoutFlag: true},
    {path:"/productroom", name:"ProductRoom", component: ProductRoom, layoutFlag: true},

    {path:"/series", name:"SeriesSet", component: SeriesSet},


    {path:"/serieslist", name:"SeriesSetList", component: SeriesSetList},
    {path:"/artist", name:"Artist", component: Artist},
    {path:"/artist/detail", name:"ArtistDetail", component: ArtistDetail},
    {path:"/cart", name:"Cart", component: Cart},

    {path:"/checkcart", name:"CheckCart", component: CheckCart},

    {path:"/pay", name:"Pay", component: Pay},
    {path:"/us", name:"Us", component: Us},
    {path:"/payover", name:"PayOver", component: PayOver},

    {path:"/login", name:"Login", component: Login},
    {path:"/register", name:"Register", component: Register},
    {path:"/luoke/agreement", name:"LuoKeAgreement", component: LuoKeAgreement},
    {path:"/info/agreement", name:"InfoAgreement", component: InfoAgreement},


    
    {path:"/people", name:"PeopleHome", component: PeopleHome},
    {path:"/people_order_list", name:"PeopleOrderListPage", component: PeopleOrderListPage},
    {path:"/people_order_detail", name:"PeopleOrderDetail", component: PeopleOrderDetail}
]
export default routes;


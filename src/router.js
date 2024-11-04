import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

import RecommendeGood from "./pages/RecommendeGood";
import ProductRoom from "./pages/ProductRoom";
import ProductRoomDetail from "./pages/ProductRoomDetail";
import SeriesSet from "./pages/SeriesSet";
import SeriesSetList from "./pages/SeriesSetList";
import Artist from "./pages/Artist";
import ArtistDetail from "./pages/ArtistDetail";

import Cart from "./pages/Cart";

import CheckCart from "./pages/CheckCart";
import Us from "./pages/Us";
import InfoAgreement from "./pages/InfoAgreement";

import LuoKeAgreement from "./pages/LuoKeAgreement";
import Pay from "./pages/Pay";
import Register from "./pages/Register";

import PeopleHome from "./pages/PeopleHome";
import PayOver from "./pages/PayOver";
import PeopleOrderList from "./pages/PeopleOrderList";

import PeopleOrderListPage from "./pages/PeopleOrderListPage";
import PeopleOrderDetail from "./pages/PeopleOrderDetail";
import Shop from "./pages/Shop";
import ShopInfo from "./pages/ShopInfo";


import routes from "./config/routerConfig";


import routesOrder from "./config/routerOrderConfig";
import RouterAuth from "./components/RouterAuth";
import RouterOrderAuth from "./components/RouterOrderAuth";
class IndexRouter extends React.Component {

    render () {
      
    
        return (  
            // basename="/build"
            <BrowserRouter>
                <App>
                    <Switch>
                
          
                        <RouterAuth routes={routes}></RouterAuth> 

                        {/* <Route path="/" render={   
                            ()=><Layout>
                                {RouterAuth && <RouterAuth routes={routes}></RouterAuth> }

                            </Layout>                            
                        }></Route> */}
                    </Switch>
                </App>
            </BrowserRouter>
        )
    }
}
export default IndexRouter;
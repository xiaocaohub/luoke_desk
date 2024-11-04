import React from "react";
import {Row, Col} from "antd";
import {Link} from "react-router-dom";

import "./index.css";
import hostBig from "../../../assets/hot_sales_big.png";
import hostSmalla from "../../../assets/hot_sales_small1.png";
import hostSmallb from "../../../assets/hot_sales_small2.png";
class HotSell extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            hostBig: "",
            hostSmalla: "",
            hostSmallb: ""
        }
    }
    render () {
        return (
            <div className="hot_sell_con">
       
                <div className="content_common_width">
                   
                   
                        <div className="hot_big">
                            <Link to="/productroom?productLabel=101"><img src={hostBig} alt=""/></Link>
                        </div>
                    
                        
                        <div className="hot_small_con" >
                            <div className="hot_small">
                                <Link to="/productroom?productLabel=102"><img src={hostSmalla} alt=""/>
                                    <div className="search">点我搜索</div>
                                </Link>
                            </div>
                            <div className="hot_small">
                                <Link to="/productroom?productLabel=103"><img src={hostSmallb} alt=""/>
                                   <div className="search">点我搜索</div>
                               </Link>
                            </div>
                        </div>
               
                </div>
            </div>
        )
    }
}

export default HotSell;
import React from "react";
import {Link} from "react-router-dom";
import Header from "../../components/People/Header";

import "./index.css";

class Show extends React.Component {
    constructor (props) {
        super(props)
        console.log("props order")
        console.log(props)
        console.log("props order")
        this.state = {
            menuList: [
                {
                    id: 0,
                    title: "基本信息",
                    path: "/shop/info"
                
                }
            ],
            navIndex: 0
        }
    }
    selectNavFn = (index)=> {
        this.setState({
            navIndex: index
        })
    }
    render () {
        return (
            <div className="people_order_list_con">
              
              
                <Header></Header>
                <div className="shop_con">
                    <div className="left_content">
                        <div className="title"><span>店铺设置</span></div>
                        
                        <ul className="menu_list">
                                
                            {this.state.menuList.map((item, index)=> {
                                return (<li className={this.state.navIndex==index?"on":""} onClick={()=>{this.selectNavFn(index)}}> <Link to={item.path}>{ item.title }</Link></li>) 
                            })}
                        </ul>
                    </div>
                    <div className="main_content">
                        { this.props.children }
                    </div>
                </div>
                
            </div>
        )
    }
}



export default Show;
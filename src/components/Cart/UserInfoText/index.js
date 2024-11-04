import React from "react";
import "./index.css";
class UserInfoText extends React.Component {
    
    constructor (props) {
        super(props)
    }

    changeFn = ()=> {
        this.props.changeInfo()
    }
    render () {
        return (
            <div>
                <div className="title">
                    <div className="tit">客户信息</div>
                </div>

                <ul className="user_info_text">
                    <li><span className="tit">收 货 人:</span>{this.props.userInfo.recipient} <div className="change_btn" onClick={this.changeFn}>修改</div></li>
                    <li><span className="tit">联系电话:</span>{this.props.userInfo.phone}</li>

                    <li><span className="tit">收货地址:</span>
                        {  this.props.userInfo.province } 
                        {  this.props.userInfo.city }

                        { this.props.userInfo.area }
                        { this.props.userInfo.detailAdress }
                    </li>

                    <li><span className="tit">备 注:</span>{this.props.userInfo.remark }</li>
                </ul>
            </div>
        )
    }
}

export default UserInfoText;
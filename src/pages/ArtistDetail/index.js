import React from "react";
import {Row, Col} from "antd";
import Header from "../../components/Header";

import "./index.css";
import bannerImg from "../../assets/banner1.png";
class ArtistDetail extends React.Component {
    constructor (props) {
          super(props)
          console.log(props)
    }
    render () {
        return (
            <div className="artist_detail_con">
                <Row>

                    <Col span={3}></Col>
                    <Col span={18}>
                        <img src={bannerImg} alt="" className="img"/>
                        <div className="title">深圳湾1号</div>
                       
                        <p className="txt">
                            深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号 深圳湾1号
                        </p>
                        <img src={bannerImg} alt="" className="img"/>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        )
    }
}



export default ArtistDetail;
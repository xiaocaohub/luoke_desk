import React from "react";
import "./index.css";
class Nav extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            navArr: [
                {
                    id: 0,
                    title: "全部"
                },
                {
                    id: 1,
                    title: "极简"
                },
                {
                    id: 2,
                    title: "轻奢"
                },
                {

                    id: 3,
                    title: "奶油"
                },
                {
                    id: 4,
                    title: "中古"
                },
                {
                    id: 5,
                    title: "侘寂"
                },
                {
                    id: 6,
                    title: "混搭"
                }
            ],


            currentIndex: 0
        }
    }
    changeFn = (index)=> {

        this.setState({
            currentIndex: index
        })
    }
    render () {
        return (   
                <ul className="tab_nav_list">
                    {this.state.navArr.map((item,index)=>{
                        return (<li className={this.state.currentIndex==index?"on":""} onClick={()=>{this.changeFn(index)}}>{item.title}</li>)
                    })}
                </ul>
          
        )
    }
}



export default Nav;
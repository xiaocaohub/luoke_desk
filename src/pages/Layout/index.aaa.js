import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import SmallCart from "../../components/SmallCart";
class Layout extends React.Component {
    constructor (props) {

        super(props)
    }
    render () {

        return (
            <div>
                

                <Header></Header>
                {this.props.children}
                <Footer></Footer>

                {/* {this.props.state.commonState.showCartFlag && <SmallCart hideSmallCart={this.props.hideSmallCartFn}></SmallCart>} */}
            
            </div>
        )
    }
}


export default Layout;
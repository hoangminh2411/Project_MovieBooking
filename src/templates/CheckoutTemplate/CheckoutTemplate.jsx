import { Fragment } from "react";
import {Redirect,Route} from "react-router";
import { USER_LOGIN } from "../../util/setting";

 const CheckoutTemplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const {Component,...restProps} = props;

    if(!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login'/>
    }


    return <Route {...restProps} render={(propsRoute)=>{
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }}/>
}

export default CheckoutTemplate
import { Fragment } from "react";
import { Route } from "react-router";
import './UserTemplate.css'

export const UserTemplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <Fragment>

            <div className="lg:flex backgroundUserTemplate">
                <Component {...propsRoute} />
                
            </div>





        </Fragment>
    }} />
}
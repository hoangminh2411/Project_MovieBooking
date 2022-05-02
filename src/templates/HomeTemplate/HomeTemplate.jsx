import { Fragment } from "react";
import {Route} from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
export const HomeTeplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const {Component,...restProps} = props;

    return <Route {...restProps} render={(propsRoute)=>{
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <Fragment>
            <Header {...propsRoute}/>
            <HomeCarousel {...propsRoute} />
            <Component {...propsRoute} />


            <hr className="mt-5"/>
            <Footer {...propsRoute} />
        </Fragment>
    }}/>
}
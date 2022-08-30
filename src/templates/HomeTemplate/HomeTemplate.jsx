import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";
import ScrollToTop from "../../components/ScrollToTopIcon/ScrollToTop";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const { Component, ...restProps } = props;
    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    useEffect(() => {
        // Chạy khi window load lần đầu
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        //chạy mỗi khi thay đổi kích thước
        window.onresize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        return ()=>{
            window.onload = null;
            window.onresize = null;

        }
    }, [])
    const renderComponent = (propsRoute) => {
        if (state.width <= 768) {
            if (props.mobileComponent) {
                return <props.mobileComponent {...propsRoute} />
            }
            return <>
                <Component {...propsRoute} />
                {/* <Footer {...propsRoute} /> */}
            </>
        }
        return <>
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
        </>
    }


    return <Route {...restProps} render={(propsRoute) => {
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <div className="overflow-hidden ">
            <ScrollToTop/>
            <Header {...propsRoute} />

            {renderComponent(propsRoute)}
            {/* <Component {...propsRoute} /> */}


            {/* <Footer {...propsRoute} /> */}
        </div>
    }} />
}
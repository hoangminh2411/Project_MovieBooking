import { Fragment, useEffect, useState } from "react";
import {Route} from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
export const HomeTemplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const {Component,...restProps} = props;
    const [state,setState] = useState ({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(()=>{
        // Chạy khi window load lần đầu
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        //chạy mỗi khi thay đổi kích thước
        window.onresize = () => {
            console.log(state)
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    },[])

    const renderComponent = (propsRoute) => {
        if(state.width <=768) {
            if(props.mobileComponent) {
                return <props.mobileComponent {...propsRoute} />
            }
            return <Component {...propsRoute} />
        }
        return <Component {...propsRoute} />
    }


    return <Route {...restProps} render={(propsRoute)=>{
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <Fragment>
            <Header {...propsRoute}/>
            
            {renderComponent(propsRoute)}
            {/* <Component {...propsRoute} /> */}

          
            {/* <Footer {...propsRoute} /> */}
        </Fragment>
    }}/>
}
import React, {memo, useEffect} from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import './HomeCarousel.css'

import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import TicketSearch from '../../../../components/TicketSearch/TicketSearch';


const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize:'contain',
    backgroundRepeat: 'no-repeat'
};

function HomeCarousel() {
    const {arrImg} = useSelector(state=>state.CarouselReducer)
    const dispatch = useDispatch()
    console.log('rerender carousel...',arrImg);

    useEffect(()=> {

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)

        const action = getCarouselAction(1);
        dispatch(action);
    },[])


    const renderCarousel = ()=> {
        return arrImg.map((item,index)=>{
            return <div key={index} className="bg-black">
                <div  style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                {/* <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} /> */}
                </div>
            </div>
        })
    }


    return (
        <div className="relative shadow-lg shadow-slate-300     ">
            <Carousel autoplay>
                    {renderCarousel()}  
            </Carousel>
            <TicketSearch/>
        </div>
    )
}
export default memo(HomeCarousel)

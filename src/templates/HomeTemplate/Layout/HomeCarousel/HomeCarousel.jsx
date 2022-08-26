import React from 'react'
import { Carousel } from 'antd';
import styles from './HomeCarousel.module.scss'
import TicketSearch from '../../../../components/TicketSearch/TicketSearch';

import { memo } from 'react';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize:'contain',
    backgroundRepeat: 'no-repeat'
};

function HomeCarousel({arrImg}) {
    const renderCarousel = ()=> {
        return arrImg.map((item,index)=>{
            return <div key={index} className="bg-black">
                <div  style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                </div>
            </div>
        })
    }
    return (
        <div className={`${styles['wrapper']}`}>
            <Carousel autoplay>
                    {renderCarousel()}  
            </Carousel>
            <TicketSearch/>
        </div>
    )
}
export default memo(HomeCarousel)

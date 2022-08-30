import React, { memo } from 'react'
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import styles from './HomeCarousel.module.scss'
import TicketSearch from '../../../components/TicketSearch/TicketSearch';
const CONTENT_STYLE = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize:'contain',
    backgroundRepeat: 'no-repeat'
};

function HomeCarousel({imageList}) {
    const renderCarousel = ()=> {
        return imageList?.map((item,index)=>{
            return <div key={index} className="bg-black">
                <div  style={{...CONTENT_STYLE,backgroundImage:`url(${item.hinhAnh})`}}>
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
HomeCarousel.propTypes = {
    imageList: PropTypes.array
}
export default memo(HomeCarousel)


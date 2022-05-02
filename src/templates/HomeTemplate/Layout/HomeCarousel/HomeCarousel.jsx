import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
    height: '460px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default function HomeCarousel() {
    return (
        <Carousel effect="fade">
            <div>
                <div style={contentStyle}>
                    <img src="http://icdn.dantri.com.vn/zoom/1200_630/2020/02/05/6-1580919062495.jpg" className="w-full bg-cover bg-center  bg-no-repeat " alt="123" />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <img src="http://icdn.dantri.com.vn/zoom/1200_630/2020/02/05/6-1580919062495.jpg" className="w-full bg-cover bg-center  bg-no-repeat " alt="123" />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <img src="http://icdn.dantri.com.vn/zoom/1200_630/2020/02/05/6-1580919062495.jpg" className="w-full bg-cover bg-center  bg-no-repeat " alt="123" />
                </div>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src="http://icdn.dantri.com.vn/zoom/1200_630/2020/02/05/6-1580919062495.jpg" className="w-full bg-cover bg-center  bg-no-repeat " alt="123" />
                </h3>
            </div>
        </Carousel>
    )
}

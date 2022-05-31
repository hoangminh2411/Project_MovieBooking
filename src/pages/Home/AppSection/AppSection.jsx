import React from 'react'
import { Carousel } from 'antd';
const contentStyle = {
    height: '370px',
    width:'100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default function AppSection() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-6">
                <div className="flex justify-center items-center xl:text-left text-center">
                    <div>
                        <p className="font-bold text-3xl">Ứng dụng tiện lợi dành cho</p>
                        <p className="font-bold text-3xl">Người yêu điện ảnh</p>
                        <br />
                        <p className="text-base">Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <br />
                        <button className="px-3 py-2 hover:bg-red-500 bg-red-600 cursor-pointer rounded-md text-base">Cài đặt Progressive App!</button>
                        <br />
                        <p className="py-4 text-base">
                            Tix có hai phiên bản
                            <span>
                                <a className="underline text-white" href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8" target="_blank" rel="noopener noreferrer" > IOS </a>
                            </span>
                            và
                            <span>
                                <a className="underline text-white" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123" target="_blank" rel="noopener noreferrer" > Android </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-span-6 ">
                <div className="relative" style={{padding:'0 28%'}}>
                <img className="h-96   " src="https://movie-booking-project.vercel.app/img/mobile/mobile.png" alt="" />
                <div className="absolute" style={{top:'7px', left:'29%'}}> 
                    <Carousel dots={false} style={{height: '369px',width:'171px'}} className="opacity-90 overflow-hidden rounded-2xl " autoplay>
                        <div>
                            <h3 style={contentStyle}><img className="w-full h-full" src="https://movie-booking-project.vercel.app/img/mobile/slide1.jpg" alt="123" /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img className="w-full h-full" src="https://movie-booking-project.vercel.app/img/mobile/slide12.jpg" alt="123" /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img className="w-full h-full" src="https://movie-booking-project.vercel.app/img/mobile/slide7.jpg" alt="123" /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img className="w-full h-full" src="https://movie-booking-project.vercel.app/img/mobile/slide13.jpg" alt="123" /></h3>
                        </div>
                    </Carousel>

                </div>
                </div>

            </div>
        </div>
    )
}

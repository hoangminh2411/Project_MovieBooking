import React, { memo } from 'react'
import { Carousel } from 'antd';

import styles from './AppSection.module.scss'

import mobile from '../../../assets/images/moblie/mobile.png'
import slider1 from '../../../assets/images/moblie/slide1.jpg'
import slider2 from '../../../assets/images/moblie/slide2.jpg'
import slider3 from '../../../assets/images/moblie/slide3.jpg'
import slider4 from '../../../assets/images/moblie/slide4.jpg'

function AppSection() {
    return (
        <div id="apps" className={`${styles['wrapper']}`}>
            <div className={`${styles['inner']}`}>
                <div className="lg:col-span-6 col-span-12">
                    <div className={`${styles['app-content']}`}>
                        <div>
                            <p className={`${styles['app-content-header']}`}>Ứng dụng tiện lợi dành cho</p>
                            <p className={`${styles['app-content-header']}`}>Người yêu điện ảnh</p>
                            <br />
                            <p className={`${styles['app-content-detail']}`}>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                            <br />
                            <button className={`${styles['app-content-btn']}`}>Cài đặt Progressive App!</button>
                            <br />
                            <p className={`${styles['app-content-version']}`}>
                                Tix có hai phiên bản
                                <span>
                                    <a className={`${styles['app-content-version-link']}`} href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8" target="_blank" rel="noopener noreferrer" > <u>IOS</u> </a>
                                </span>
                                và
                                <span>
                                    <a className={`${styles['app-content-version-link']}`} href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123" target="_blank" rel="noopener noreferrer" > <u>Android</u></a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                    <div className={`${styles['app-mobile']}`}>
                        <img className={`${styles['mobile']}`} src={mobile} alt="mobile" />
                        <div className={`${styles['carousel']}`}>
                            <Carousel dots={false} style={{ height: '372px',width:'169px'}} className="opacity-90 overflow-hidden rounded-[25px]" autoplay>
                                <div>
                                    <img className="w-full h-full" src={slider1} alt="Slider 1 Mobile" />
                                </div>
                                <div>
                                    <img className="w-full h-full" src={slider2} alt="Slider 2 Mobile" />
                                </div>
                                <div>
                                    <img className="w-full h-full" src={slider3} alt="Slider 3 Mobile" />
                                </div>
                                <div>
                                    <img className="w-full h-full" src={slider4} alt="Slider 4 Mobile" />
                                </div>
                            </Carousel>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default memo(AppSection)

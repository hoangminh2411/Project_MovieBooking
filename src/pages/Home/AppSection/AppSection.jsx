import React, {memo} from 'react'
import { Carousel } from 'antd';
import styles from './AppSection.module.scss'
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
                                        <a className={`${styles['app-content-version-link']}`} href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8" target="_blank" rel="noopener noreferrer" > IOS </a>
                                    </span>
                                    và
                                    <span>
                                        <a className={`${styles['app-content-version-link']}`} href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123" target="_blank" rel="noopener noreferrer" > Android </a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className={`${styles['app-mobile']}`}>
                            <img className={`${styles['mobile']}`} src={require('../../../assets/images/moblie/mobile.png')} alt="mobile" />
                            <div className={`${styles['carousel']}`}>
                                <Carousel dots={false} style={{ height: '369px', width: '171px' }} className="opacity-90 overflow-hidden rounded-2xl " autoplay>
                                    <div>
                                        <img className="w-full h-full" src={require('../../../assets/images/moblie/slide1.jpg')} alt="123" />
                                    </div>
                                    <div>
                                       <img className="w-full h-full" src={require('../../../assets/images/moblie/slide2.jpg')} alt="123" />
                                    </div>
                                    <div>
                                       <img className="w-full h-full" src={require('../../../assets/images/moblie/slide3.jpg')} alt="123" />
                                    </div>
                                    <div>
                                        <img className="w-full h-full" src={require('../../../assets/images/moblie/slide4.jpg')} alt="123" />
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

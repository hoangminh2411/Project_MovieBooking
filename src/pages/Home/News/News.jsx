import React, { memo } from 'react'
import { Tabs } from 'antd';
import styles from './News.module.scss'

const { TabPane } = Tabs;
function News() {
    return (
        <div id="news" className={`${styles['wrapper']}`}>
            
                <Tabs style={{ color: '#FA5238', fontSize: '14px' }} centered={true} defaultActiveKey="1" >
                    <TabPane tab={<div className={`${styles['title']}`}>ĐIỆN ẢNH 24H</div>} key="1">  
                        <div className={`${styles['main-news']}`}>
                            <div className={`${styles['main-items']} pr-2`}>
                                <img src="https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                                    <p> Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                                </div>
                            </div>
                            <div className={`${styles['main-items']} pl-2`}>
                                    <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                                    <p>Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['sub-news']}`}>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                                
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                    <p> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                                </div>
                            </div>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                    <p> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                                </div>
                            </div>
                            <div className={`${styles['sublist-right-side']}`}>
                                <div className={`${styles['sublist-right-side-wrapper']}`}>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p> Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']}`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </TabPane>
                    <TabPane tab={<div className={`${styles['title']}`}>REVIEW</div>} key="2">
                        <div className={`${styles['main-news']}`}>
                            <div className={`${styles['main-items']} pr-2`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                                    <p> Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                                </div>
                            </div>
                            <div className={`${styles['main-items']} pl-2`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                                    <p>Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['sub-news']}`}>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                                
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                    <p> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                                </div>
                            </div>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                    <p> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                                </div>
                            </div>
                            <div className={`${styles['sublist-right-side']}`}>
                                <div className={`${styles['sublist-right-side-wrapper']}`}>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p> Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']}`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </TabPane>
                    <TabPane tab={<div className={`${styles['title']}`}>KHUYẾN MÃI</div>} key="3">
                        <div className={`${styles['main-news']}`}>
                            <div className={`${styles['main-items']} pr-2`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>BHD 59K/VÉ CẢ TUẦN !!!</h4>
                                    <p> Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.</p>
                                </div>
                            </div>
                            <div className={`${styles['main-items']} pl-2`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg" alt="123" />
                                <div className={`${styles['main-content-wrapper']}`}>
                                    <h4>TIX 1K/VÉ NGẠI CHI GIÁ VÉ</h4>
                                    <p>Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['sub-news']}`}>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                                
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                    <p> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                                </div>
                            </div>
                            <div className={`${styles['subitems']} pr-4`}>
                                    <img src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                                <div className={`${styles['subcontent-wrapper']}`}>
                                    <h4>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                    <p> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                                </div>
                            </div>
                            <div className={`${styles['sublist-right-side']}`}>
                                <div className={`${styles['sublist-right-side-wrapper']}`}>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p> Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']} mb-2`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                        </div>

                                    </div>
                                    <div className={`${styles['sublist-items']}`}>
                                        <div className={`${styles['sublist-items-img']}`}>
                                            <img src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news" />
                                        </div>
                                        <div className={`${styles['sublist-items-content']}`}>
                                            <p>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </TabPane>
                </Tabs>
            

        </div>
    )
}
export default memo(News)

import React from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

export default function News() {
    return (
        <div className="container mx-auto">
        <div  id="news" className="lg:mx-56 xl:mx-56  pt-16">
            <Tabs style={{color:'#FA5238',fontSize:'14px'}}  centered={true} defaultActiveKey="1" onChange={onChange}>
                <TabPane  tab={<div className="text-black hover:text-red-600 hover:scale-110 hover:-translate-y-1 flex justify-center items-center">ĐIỆN ẢNH 24H</div>} key="1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                                <p style={{ color: '#6c757d' }}> Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png" alt="123" />
                            </a>

                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                                <p style={{ color: '#6c757d' }}>Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-4 xl:pr-4 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                <p style={{ color: '#6c757d' }}> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 xl:pr-4">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                <p style={{ color: '#6c757d' }}> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 pr-4">
                            <div className="flex flex-col">
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </TabPane>
                <TabPane tab={<div className="text-black hover:text-red-600 hover:scale-110 hover:-translate-y-1   flex justify-center items-center">REVIEW</div>} key="2">
                <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất</h4>
                                <p style={{ color: '#6c757d' }}> Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png" alt="123" />
                            </a>

                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...</h4>
                                <p style={{ color: '#6c757d' }}>Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-4 xl:pr-4 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                <p style={{ color: '#6c757d' }}> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 xl:pr-4">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                <p style={{ color: '#6c757d' }}> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 xl:pr-4">
                            <div className="flex flex-col">
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </TabPane>
                <TabPane tab={<div className="text-black hover:text-red-600 hover:scale-x-110 hover:-translate-y-1   flex justify-center items-center">KHUYẾN MÃI</div>} key="3">
                <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>BHD 59K/VÉ CẢ TUẦN !!!</h4>
                                <p style={{ color: '#6c757d' }}> Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6 xl:pl-5 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg" alt="123" />
                            </a>

                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>TIX 1K/VÉ NGẠI CHI GIÁ VÉ</h4>
                                <p style={{ color: '#6c757d' }}>Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-4 xl:pr-4 ">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="123" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                                <p style={{ color: '#6c757d' }}> Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 xl:pr-4">
                            <a href="#">
                                <img className="w-full h-auto rounded-md" src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
                            </a>
                            <div className="py-3">
                                <h4 className="font-bold" style={{ fontSize: '17px' }}>VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                                <p style={{ color: '#6c757d' }}> Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 xl:pr-4">
                            <div className="flex flex-col">
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4 ">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</p>
                                    </div>
                                    
                                </div>
                                <div  className="flex flex-row justify-start">
                                    <div className="w-1/4 mr-1">
                                        <img className="w-full h-auto" src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="" />
                                    </div>
                                    <div className="w-3/4">
                                        <p className="text-xl" style={{ color: '#6c757d' }}>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </TabPane>
            </Tabs>
        </div>

        </div>
    )
}


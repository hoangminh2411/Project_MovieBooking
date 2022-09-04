import React, { memo } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { Rate } from 'antd';
 function FilmContent({filmDetail}) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
        className="detailBackground relative">
      </div>
      <div
        style={{ background: 'linear-gradient(to top, rgb(10, 32, 41) 10%, transparent 70%)' }} className="absolute bottom-0 left-0 h-screen w-full -z-0"
      ></div>

      <section className="detailContent w-full container mx-auto mt-20 lg:px-5 xl:px-20 ">
        <div className=" flex justify-between items-center xl:px-40 lg:px-20   ">
          <div className="flex">
            <img
              style={{ height: '240px', width: '40%' }}
              src={filmDetail.hinhAnh}
              alt="Hình ảnh chi tiết phim" 
            />
            <div className="text-white ml-3 w-2/3 flex flex-col justify-center">
              <p className=" text-2xl font-bold mb-2">
                <span className="inline-block px-2 mr-2 rounded bg-red-500 text-white ">C18</span>{filmDetail.tenPhim}
              </p>
              <p className="text-white">
                120 phút - 10 Idb - 2D/digital
              </p>
              <p className="text-gray-200 italic text-sm font-light">
                Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}
              </p>
              <a
                href="#TapMovieDetail"
                className="rounded-lg w-56 bg-red-700 text-base opacity-90 hover:opacity-100 hover:text-white cursor-pointer text-white px-6 py-3 text-center"
              >
                Thông tin phim
              </a>
            </div>
          </div>
          <div
            style={{ left: '75.6%' }}
            className="absolute top-0">
            <div className="mb-5">
              <p className="text-green-500 font-bold text-xl text-center mb-0">Đánh giá</p>
              <span className="text-center"><Rate allowHalf disabled value={filmDetail.danhGia / 2} /></span>
            </div>
            <div className={`c100 p${Math.round(filmDetail.danhGia * 10)} normal center`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>
      </section>  
    </>
  )
}
FilmContent.propTypes = {
  filmDetail: PropTypes.object,
}
export default memo(FilmContent)


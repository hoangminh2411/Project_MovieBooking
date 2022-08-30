import React, { useState } from 'react'

import PropTypes from 'prop-types';

import { history } from '../../../App'

import { useDispatch } from 'react-redux';
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../../redux/types/QuanLyPhimType";

import Slider from "react-slick";


function MovieListMobile({ movieList, windowHeight }) {
    const [filmStatus, setFilmStatus] = useState({
        dangChieu: false,
        sapChieu: false
    })
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const dispatch = useDispatch();
    const MOBILE_HEIGHT =700
    const handleGoToDetailPage = (item) => {
        history.push(`/detail/${item.maPhim}`)
    }
    const renderFilmsSubNav = () => {
        return movieList.map((item, index) => {
            return <div key={index} className="mx-4 mt-20" >
                <div className="flex flex-col items-center">
                    <img
                        className="rounded-xl transition w-[140px] h-[180px]"
                        src={item.hinhAnh}
                        alt="hinh anh phim"
                    />
                    <p className="hidden text-xl font-bold text-white -translate-y-6 ">{item.tenPhim}</p>
                </div>
            </div>
        })
    }
    const renderFilmsMainNav = () => {
        return movieList.map((item, index) => {
            return <div key={index}>
                <div className="flex flex-col items-center relative">
                    <img
                        style={{ filter: 'blur(2px)' }}
                        className="rounded-xl transition h-screen w-screen"
                        src={item.hinhAnh}
                        alt="hinh anh phim"
                    />
                    <div
                        style={{ background: 'linear-gradient(to top, #0d0d0c 20%, transparent 100%)' }}
                        className="absolute bottom-0 left-0 h-screen w-screen -z-0"
                    >
                    </div>
                    <div className="w-full absolute top-0 left-0 z-10 flex flex-col items-center mt-40 ">
                        <h1 className="text-2xl text-white ">{item.tenPhim}</h1>
                        <div className="flex">
                            <div
                                className="mr-3 px-3 py-4 text-white rounded-lg"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5' }}
                            >
                                POPULAR WITH FRIEND
                            </div>
                            <div
                                className="mr-3 px-3 py-4 text-white rounded-lg"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5' }}
                            >
                                15+
                            </div>
                            <div className="px-3 py-4 text-black font-bold rounded-lg"
                                style={{ backgroundColor: 'rgb(251,191,16)' }}
                            >
                                {item.danhGia}/10
                            </div>
                        </div>
                        <div className="flex justify-around text-white font-base mt-5">
                            <p className="mx-3">2019</p>
                            <p className="mx-3">Crime, Drama, Thriller</p>
                            <p>Datasat, Dolby  Digital</p>
                        </div>
                        <div className="w-2/3 h-px bg-red-500 mb-5 mt-5 shadow-red-500 shadow-xl" ></div>
                        <div
                            onClick={() => {
                                handleGoToDetailPage(item)
                            }}
                            className={item.dangChieu === true ?
                                ' mr-2 px-10 py-4 text-white rounded-lg bg-red-600 mb-5 hover:bg-red-500 cursor-pointer' :
                                ' mr-2 px-10 py-4 text-white rounded-lg bg-blue-600 mb-5 hover:bg-blue-500 cursor-pointer'}
                        >
                            {item.dangChieu === true ? 'ĐẶT VÉ' : 'THÔNG TIN PHIM'}
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    const handleLoadMoviesSapChieu = () => {
        setFilmStatus({
            sapChieu: true,
            dangChieu: false,
        })
        const action = { type: SET_PHIM_SAP_CHIEU }
        dispatch(action);
    }

    const handleLoadMoviesDangChieu = () => {
        setFilmStatus({
            dangChieu: true,
            sapChieu: false,
        })
        const action = { type: SET_PHIM_DANG_CHIEU }
        dispatch(action);
    }

    let activeClassDC = filmStatus.dangChieu === true ? 'active_FilmMoble' : 'none_active_filmMoble'
    let activeClassSC = filmStatus.sapChieu === true ? 'active_FilmMoble' : 'none_active_filmMoble'
    return (
        <section
            id="lichChieu"
            className="text-gray-600 pt-10"
        >
            <div className="relative w-screen  overline-scroll">
                <div
                    className="flex justify-center items-center absolute w-full top-2 left-1/2 -translate-x-1/2"
                    style={{ zIndex: '99' }}
                >
                    <div className="rounded-2xl flex justify-center items-center py-1 bg-[rgba(0,0,0,0.5)]">
                        <button
                            onClick={handleLoadMoviesDangChieu}
                            className={`${activeClassDC} px-8 py-1 mr-2 ml-2 font-semibold rounded-2xl transition`}
                        >
                            PHIM ĐANG CHIẾU
                        </button>
                        <button
                            onClick={handleLoadMoviesSapChieu}
                            className={`${activeClassSC} px-8 py-1 mr-2  font-semibold rounded-2xl transition`}
                        >
                            PHIM SẮP CHIẾU
                        </button>
                    </div>
                </div>
                <div>
                    <Slider
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                    >
                        {renderFilmsMainNav()}
                    </Slider>
                    {windowHeight > MOBILE_HEIGHT ? 
                    <div className="-translate-y-80" >
                        <Slider
                            centerMode={true}
                            asNavFor={nav1}
                            ref={(slider2) => setNav2(slider2)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            variableWidth={true}
                            adaptiveHeight={true}
                            centerPadding={0}
                            className={`slider variable-width center`}
                        >
                            {renderFilmsSubNav()}
                        </Slider>
                    </div> : ""}

                </div>

            </div>
        </section>
    )
}


MovieListMobile.propTypes = {
    movieList: PropTypes.array,
    windowHeight: PropTypes.number,
}
  

export default MovieListMobile
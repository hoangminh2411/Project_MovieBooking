import React, { useEffect, useState } from 'react'

import { Spin } from 'antd';
// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapAction';
import { getCarouselAction } from '../../redux/actions/CarouselAction';

import Theaters from './Theaters/Theaters'

import News from './News/News'
import AppSection from './AppSection/AppSection';
import HomeCarousel from './Carousel/HomeCarousel';
import MovieList from './MovieList/MovieList';
import MovieListMobile from './MovieList/MovieListMobile';

export default function Home() {
    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const { movieList } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const { imageList } = useSelector(state => state.CarouselReducer);

    const THEATER_IN_LIST = heThongRapChieu.length
    const MOVIES_IN_LIST = movieList.length;
    const MOBILE_WIDTH = 768
    const dispatch = useDispatch();

    useEffect(() => {
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        //chạy mỗi khi thay đổi kích thước
        window.onresize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)
        window.scrollTo({ top: 0 });
        dispatch(getCarouselAction());
        dispatch(layDanhSachPhimAction());
        dispatch(layDanhSachRapAction());
    }, [dispatch])
    return (
        <>
            <HomeCarousel imageList={imageList} />
            {state.width <= MOBILE_WIDTH ? <Spin spinning={movieList?.length <= 1}><MovieListMobile windowHeight={state.height} movieList={movieList} /></Spin> : <Spin spinning={MOVIES_IN_LIST <= 1}><MovieList movieList={movieList} /></Spin>}
            <Spin spinning={THEATER_IN_LIST === 0}><Theaters heThongRapChieu={heThongRapChieu} /></Spin>
            <News />
            <AppSection />
        </>
    )
}

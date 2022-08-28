import React, { useEffect, useState } from 'react'
// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'

import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapAction';

import Theaters from './Theaters/Theaters'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import Film_MobleV2 from '../../components/Film/Film_MobleV2';

import News from './News/News'
import AppSection from './AppSection/AppSection';
import { getCarouselAction } from '../../redux/actions/CarouselAction';
import {  Spin } from 'antd';
export default function Home() {
    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const { arrImg } = useSelector(state => state.CarouselReducer);
    
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
    }, [])
    return (
        <>
             <HomeCarousel arrImg={arrImg} />
            
            {state.width <= 768 ? <Spin spinning={arrFilm.length<=1}><Film_MobleV2 windowHeight={state.height} arrFilm={arrFilm} /></Spin> : <Spin spinning={arrFilm.length<=1}><MultipleRows arrFilm={arrFilm} /></Spin>}
            <Spin spinning={heThongRapChieu.length===0}><Theaters heThongRapChieu={heThongRapChieu} /></Spin>
            <News />
            <AppSection />
        </>
    )
}

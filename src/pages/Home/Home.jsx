import React, { useEffect, useState } from 'react'
// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'

import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapAction';


import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import Film_MobleV2 from '../../components/Film/Film_MobleV2';
import HomeMenu from './HomeMenu/HomeMenu'
import News from './News/News'
import AppSection from './AppSection/AppSection';

export default function Home(props) {
    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
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
        const action = layDanhSachPhimAction();
        dispatch(action);

        dispatch(layDanhSachRapAction());
    }, [])
    console.log(state.width, state.height);
    return (
        <>
            <HomeCarousel />
            {state.width <= 768 ? <Film_MobleV2 /> : <MultipleRows arrFilm={arrFilm} />}
            <HomeMenu heThongRapChieu={heThongRapChieu} />
            <News />
            <AppSection />
        </>
    )
}

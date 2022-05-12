import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'

// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';



export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(() => {

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)
        window.scrollTo({ top: 0 });
        const action = layDanhSachPhimAction();
        dispatch(action);

        dispatch(layDanhSachRapAction());
    }, [])

    return (
        <div>
            <HomeCarousel />
            <section id="lichChieu" className="text-gray-600 pt-10">
                
                    <MultipleRows arrFilm={arrFilm} />
                
            </section>
            <div className="container mx-auto">
                <div id="cumRap" className="opacity-0 lg:opacity-100 xl:opacity-100 lg:mx-56 xl:mx-56  pt-16">
                    <HomeMenu heThongRapChieu={heThongRapChieu} />
                </div>

            </div>

        </div>
    )
}

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
    const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(()=> {

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)

        const action = layDanhSachPhimAction();
        dispatch(action);
        
        dispatch(layDanhSachRapAction());
    },[])

    return (
        <div>
            <HomeCarousel/>
            <section className="text-gray-600 mt-4 mb-5">
                <div className="container mx-auto">
                    <MultipleRows arrFilm={arrFilm}/>
                </div>
            </section>
            <div className="container mx-auto shadow">
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>

        </div>
    )
}

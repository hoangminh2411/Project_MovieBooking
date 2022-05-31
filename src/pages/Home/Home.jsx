import React, { useEffect, useState } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'

// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import News from './News/News'
import AppSection from './AppSection/AppSection';
import Film_Moble from '../../components/Film/Film_Moble';
import Film_MobleV2 from '../../components/Film/Film_MobleV2';

export default function Home(props) {
    const [state,setState] = useState ({
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
    console.log(state.width,state.height);
    return (
        <div>
            <HomeCarousel />
            <section id="lichChieu" className="text-gray-600 pt-10">
                
                    {state.width <=768? <Film_MobleV2/>:<MultipleRows arrFilm={arrFilm}/>  }
                
            </section>
            <div className="container mx-auto">
                <div id="cumRap" className="hidden lg:block xl:block lg:mx-56 xl:mx-56  pt-16">
                    <HomeMenu heThongRapChieu={heThongRapChieu} />
                </div>

            </div>
            <div className="container mx-auto">
                <div id="news" className="lg:mx-56 xl:mx-56  pt-16">
                        <News />
                </div>

            </div>
            <div id="apps" className="mt-5" style={{backgroundImage: 'url(https://movie-booking-project.vercel.app/img/mobile/backapp.jpg)',color:'white',height:'fit-content',backgroundSize:'cover',backgroundPosition:'center'}}>
                <div className="py-16 m-auto " style={{height:'fit-content',maxWidth:'940px',}}>
                        <AppSection />
                </div>
                

            </div>
            
        </div>  
    )
}

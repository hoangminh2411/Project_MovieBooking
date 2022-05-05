import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'

// Kết nối redux 
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';



export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    console.log(arrFilm);

    // const renderFilms = () => {
    //     return arrFilm.map((item, index) => {
    //         return <Film key={index}/>
    //     })
    // }
    useEffect(()=> {

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)

        const action = layDanhSachPhimAction();
        dispatch(action);
    },[])

    return (
        <div>
            
            <section className="text-gray-600 body-font mt-4 mb-5">
                <div className="container mx-auto">
                    <MultipleRows arrFilm={arrFilm}/>
                    {/* <div className="flex flex-wrap -m-4"  style={{justifyContent: 'center'}} >
                            {renderFilms()}

                    </div> */}
                </div>
            </section>
            <div className="mx-36 ">
                <HomeMenu />
            </div>

        </div>
    )
}

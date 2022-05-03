import React, {useEffect} from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector} from 'react-redux';


import { getCarouselAction } from '../../../../redux/actions/CarouselAction';


const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize:'contain',
    backgroundRepeat: 'no-repeat'
};

export default function HomeCarousel(props) {

    const {arrImg} = useSelector(state=>state.CarouselReducer)
    const dispatch = useDispatch()
    console.log('arrImg',arrImg);


    // Sẽ tự kích hoạt khi component load ra
    // useEffect(async ()=>{
    //     try{
    //         const result = await axios({
    //             url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner',
    //             method: 'GET',
    //             headers: {
    //                 "TokenCybersoft": TOKEN_CYBERSOFT
    //             }

    //         });
    //         // Đưa lên reducer
    //         console.log('result',result);

    //         dispatch({
    //             type:'SET_CAROUSEL',
    //             arrImg: result.data.content
    //         })
    //     }
    //     catch(errors){
    //         console.log('errors',errors);
    //     }
    // },[])

    useEffect(()=> {

        // 1 action = {type:'',data}
        // 2 (phải cài middleware): callBackFunction(dispatch)

        const action = getCarouselAction(1);
        dispatch(action);
    },[])


    const renderCarousel = ()=> {
        return arrImg.map((item,index)=>{
            return <div key={index} className="bg-black">
                <div  style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                {/* <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} /> */}
                </div>
            </div>
            
        
        })
    }


    return (
        <div className="relative shadow-lg shadow-slate-400  ">
            <img src="	https://media.lottecinemavn.com/Media/WebAdmin/0b836a6f0c6b41c9902cd9ad77bd65d5.jpg" alt="123" className="w-56   absolute top-0 z-10 left-0   " />
            <Carousel autoplay>
                    {renderCarousel()}  
            </Carousel>

            <img src="	https://media.lottecinemavn.com/Media/WebAdmin/0b836a6f0c6b41c9902cd9ad77bd65d5.jpg" alt="123" className="w-56 absolute top-0 z-10 right-0  " />

        </div>
    )
}

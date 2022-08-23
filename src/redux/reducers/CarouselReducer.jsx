import { Img } from '../../_core/models/ThongTinCarousel';
import { SET_CAROUSEL } from '../types/CarouselType';

const stateDefault = {
    arrImg: [Img]

}

export const CarouselReducer = (state = stateDefault,action)=> {
    switch(action.type) {
        case SET_CAROUSEL : {
            state.arrImg = action.arrImg;
            return {...state}
        }
        default: return {...state}
    }
}
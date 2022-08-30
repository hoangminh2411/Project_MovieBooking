import { Img } from '../../_core/models/ThongTinCarousel';
import { SET_CAROUSEL } from '../types/CarouselType';

const stateDefault = {
    imageList: [Img]

}

export const CarouselReducer = (state = stateDefault,{type, payload})=> {
    switch(type) {
        case SET_CAROUSEL : {
            state.imageList = payload.imageList;
            return {...state}
        }
        default: return {...state}
    }
}
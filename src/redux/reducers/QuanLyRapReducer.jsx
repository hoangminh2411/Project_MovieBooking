import { LAY_DANH_SAC_RAP } from "../types/QuanLyRapType"

const stateDefault = {
    heThongRapChieu: []
}

export const QuanLyRapReducer = (state = stateDefault,action) =>{
    switch(action.type) {
        case LAY_DANH_SAC_RAP: {
            state.heThongRapChieu = action.heThongRapChieu
        }
        default: return{...state}
    }
}
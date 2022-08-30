import Toast from "../../components/Toast/Toast";
import { quanLyCommentService } from "../../services/QuanLyCommentService";
import { LAY_DANH_SACH_BINH_LUAN } from "../types/QuanLyBinhLuanType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";


export const layDanhSachCommentAction = ()=>{
    return async dispatch => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyCommentService.layDanhSachComments();
            if(result.status === 200) {
                await dispatch({
                    type:LAY_DANH_SACH_BINH_LUAN,
                    danhSachComment: result.data
                })                
            }
            dispatch(hideLoadingAction)
        }
        catch(errors){
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }
            else{
                Toast('error','ERROR',errors.message)  
            }
          
        }
    }
}

export const postCommentAction = (comment)=>{
    return async dispatch => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyCommentService.postComments(comment);
            if(result.status === 201) {
              
                await dispatch(layDanhSachCommentAction());
                
            }
            dispatch(hideLoadingAction)

        }
        catch(errors){  
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }
            else{
                Toast('error','ERROR',errors.message)  
            }
        }
    }
}


export const likeCommentAction = (id,comment)=>{
    return async dispatch => {
        try{
            
            const result = await quanLyCommentService.likeComments(id,comment);
            if(result.status === 200) {
              
                await dispatch(layDanhSachCommentAction());
            }
        }
        catch(errors){  
            
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }
            else{
                Toast('error','ERROR',errors.message)  
            }
        }
    }
}
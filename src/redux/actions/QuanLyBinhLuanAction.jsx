import { quanLyCommentService } from "../../services/QuanLyCommentService";
import { LAY_DANH_SACH_BINH_LUAN } from "../types/QuanLyBinhLuanType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";


export const layDanhSachCommentAction = ()=>{
    return async dispatch => {
        try{
           
            const result = await quanLyCommentService.layDanhSachComments();
            if(result.status === 200) {
                await dispatch({
                    type:LAY_DANH_SACH_BINH_LUAN,
                    danhSachComment: result.data
                })

                
            }
        }
        catch(errors){
            
            console.log('error lay danh sach binh luan',errors)
          
        }
    }
}

export const postCommentAction = (comment)=>{
    return async dispatch => {
        try{
           
            const result = await quanLyCommentService.postComments(comment);
            console.log(result);
            if(result.status === 201) {
              
                await dispatch(layDanhSachCommentAction());
            }
        }
        catch(errors){  
            console.log('errors',errors) 
        }
    }
}


export const likeCommentAction = (id,comment)=>{
    return async dispatch => {
        try{
           
            const result = await quanLyCommentService.likeComments(id,comment);
            console.log(result);
            if(result.status === 200) {
              
                await dispatch(layDanhSachCommentAction());
            }
        }
        catch(errors){  
            console.log('errors',errors) 
        }
    }
}
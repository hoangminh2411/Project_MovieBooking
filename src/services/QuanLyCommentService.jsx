
import  {commentService} from './baseService'

export class QuanLyCommentService extends commentService {

    constructor(){
        super();
    }

    layDanhSachComments = ()=>{
        return this.get(`commentMovie`);
    }

    postComments = (comment) => {
        return this.post(`commentMovie`,comment);
    }

    likeComments = (id,comment) => {
        return this.put(`commentMovie/${id}`,comment);
    }
}

export const quanLyCommentService = new QuanLyCommentService();
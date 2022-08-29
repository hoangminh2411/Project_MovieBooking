import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Rate } from 'antd';
import moment from 'moment';
import { postCommentAction } from '../../redux/actions/QuanLyBinhLuanAction';



export default function ModalComment({binhLuan, user, maPhim, onPopup, onClosePopup }) {

  const [value, setValue] = useState(3);
  useEffect(()=>{
    formik.setFieldValue('id',binhLuan.length + 1)

  },[binhLuan])
  const dispatch = useDispatch()
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      avtId: user?.hoTen,
      username: user?.hoTen,
      point: value,
      post: "",
      likes: "",
      maPhim: maPhim.id,
      dataTest: false,
      createdAt: moment().format(),
      userLikeThisComment: [],
      id: binhLuan.length + 1
    },
    validationSchema: Yup.object({
      post: Yup.string().required('Đánh giá không được bỏ trống').min(16,'Đánh giả phải tối thiểu 16 kí tự'),
      
  }),
    onSubmit: values => {
      
      dispatch(postCommentAction(values))
      onClosePopup()

    },
  });

 

  if (!onPopup) {
    return ''
  }
  return (
    <div onClick={() => {
      onClosePopup()
    }} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div onClick={(e) => {
        e.stopPropagation()

      }} className="bg-white cursor-pointer rounded-lg overflow-hidden ">
        <form  onSubmit={ formik.handleSubmit} className="flex-col justify-center items-center" style={{ maxWidth: '647px', width: '647px' }}>

          <div className="text-center">
            <h1 style={{ fontSize: '40px' }} className=" mb-0 text-green-500">{value * 2}</h1>

            <Rate style={{ fontSize: '40px' }} allowHalf onChange={(values)=>{
                formik.setFieldValue('point',values);
                setValue(values)
              
              }} value={value} />

          </div>

          <div className='rounded-lg' style={{ padding: '8px 24px', minHeight: '95px' }}>
            <input name="post" onChange={formik.handleChange} style={{ padding: '30px 20px' }} className="w-full h-full border border-gray-500 rounded-lg" placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này.." type="text" />
            {formik.touched.post && formik.errors.post ? (
                        <div className="text-red-500 italic ">{formik.errors.post}</div>
                    ) : null}
          </div>

          <div onClick={()=>{
            formik.setFieldValue('createdAt',moment().format());
          }} style={{ padding: '8px 24px' }} className="flex justify-center">
            <button type="submit" className="text-white font-medium rounded-md " style={{ padding: '7px 25px', borderColor: '#fb4226', backgroundColor: '#fb4226', marginBottom: '7px' }}>ĐĂNG</button>
          </div>

        </form>

      </div>
    </div>
  )

}

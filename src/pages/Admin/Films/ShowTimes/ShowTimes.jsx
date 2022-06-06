import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../../services/QuanLyRapService';
import {useFormik}  from 'formik'
import moment from 'moment'
import { quanLyDatVeService, QuanLyDatVeService } from '../../../../services/QuanLyDatVeService';


export default function ShowTimes(props) {
  
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu:'',
      maRap:'',
      giaVe:''
    },
    
    onSubmit: async (values) => {
      console.log('values',values)
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);

        alert(result.data.content)
      }
      catch(errors){
        console.log(errors)
      }
    }
  })
  const [state,setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  useEffect(()=>{
    async function fechData(){
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
          ...state, 
          heThongRapChieu: result.data.content
        })
  
        console.log(state.heThongRapChieu)
      }
      catch(error){
        console.log(error)
      }
    }
    fechData()
  },[])


  const handleChangeHeThongRap = async (value) => {
    // Từ hệ thống rap call API lấy thông tin rạp
    
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state, 
        cumRapChieu: result.data.content
      })
      
    }
    catch (errors) {
      console.log(errors)
    }
  
  
}


  const handleChangeCumRap =  async (value) => {
    formik.setFieldValue('maRap',value); 
  }

  const onOk = (value) => {
    console.log('ngayGIo',value)
    formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'));
  }

  const handleChangeNgayGioChieu = (value) => {
    formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'));
    console.log('ngayGIo',value)
  }

  const handleChangeGiaVe = (values) => {
    formik.setFieldValue('giaVe',values); 
  }

  console.log('cumRap',state.cumRapChieu)
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl">Tạo lịch chiếu</h3>
      <Form.Item label="Hệ thống rạp">
        <Select options={state.heThongRapChieu?.map((htr,index)=>{
          return {label:htr.tenHeThongRap, value:htr.maHeThongRap}
        })} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
      </Form.Item>


      <Form.Item label="Cụm rạp">
        <Select options={state.cumRapChieu?.map((cumRap,index)=>{
          return {label:cumRap.tenCumRap, value:cumRap.maCumRap}
        })} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
      </Form.Item>


      <Form.Item label="Ngày giờ chiếu">
        <DatePicker showTime onChange={handleChangeNgayGioChieu} onOk={onOk} />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber min={75000} max={150000} onChange={handleChangeGiaVe} />
      </Form.Item>

      <Form.Item label="Chức năng">
        <Button type="primary" htmlType="submit">
          Tạo lích chiếu
        </Button>
      </Form.Item>
    </Form>
  )
}

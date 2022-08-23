import React, { useEffect, useState } from 'react'
import { Form,Button, Table} from 'antd';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../../services/QuanLyRapService';
import { useFormik } from 'formik'
import moment from 'moment'
import { quanLyDatVeService, QuanLyDatVeService } from '../../../../services/QuanLyDatVeService';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../../../redux/actions/QuanLyRapAction';


export default function ShowTimes(props) {
  const dispatch = useDispatch()
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },

    onSubmit: async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);

        alert(result.data.content)
      }
      catch (errors) {
        console.log(errors)
      }
    }
  })
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
    

    async function fechData() {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
          ...state,
          heThongRapChieu: result.data.content
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    fechData()
  }, [])


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


  const handleChangeCumRap = async (value) => {
    formik.setFieldValue('maRap', value);
  }

  const onOk = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
  }

  const handleChangeNgayGioChieu = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
  }

  const handleChangeGiaVe = (values) => {
    formik.setFieldValue('giaVe', values);
  }
  const renderLichChieuPhim = ()=> {
    return filmDetail.heThongRapChieu?.map((heThongRap)=>{
      return heThongRap.cumRapChieu?.map((cumRap)=>{
        return cumRap.lichChieuPhim?.slice(0, 5).map((film,index)=>{
          return <tr key={index} className="bg-white relative hover:bg-slate-200 hover:cursor-pointer pb-20 overflow ">
            <th className="px-6 py-4 rounded-l-xl">
              {film.maLichChieu}
            </th>
            <th className="px-6 py-4 ">
              {`${cumRap.tenCumRap} ${film.tenRap}`}
            </th>
            <th className="px-6 py-4 ">
            {moment(film.ngayChieuGioChieu).format('DD/MM/YYYY h:mm A')}
            </th>
            <th className="px-6 py-4 rounded-r-xl">
              {film.giaVe}
            </th>
          </tr>
        })
      })
    })
  } 
  
 
  return (
    <>
    <div className="flex justify-center">
      <div className="mr-5" style={{width: '200px'}}>
        <img className="rounded-md" src={filmDetail.hinhAnh} alt="" />
      </div>
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
          <Select options={state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
          })} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>


        <Form.Item label="Cụm rạp">
          <Select options={state.cumRapChieu?.map((cumRap, index) => {
            return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
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
    </div>
    <div className="relative  overflow-auto " style={{ height: '450px' }}>
                        <table className="w-full text-sm text-left " style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                            <thead className="text-xs  uppercase" style={{ backgroundColor: 'rgba(231,227,233,0.4)' }}>
                                <tr className="">
                                    <th scope="col" className="px-6 py-3 rounded-l-xl">
                                        Mã lịch chiếu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hệ thống rạp - tên rạp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày chiếu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        giá vé
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderLichChieuPhim()}
                            </tbody>
                        </table>
                    </div>
    </>
  )
}

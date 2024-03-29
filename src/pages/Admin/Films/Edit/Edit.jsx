import React, { useState, Fragment, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { GROUP_ID } from '../../../../util/setting';
// thư viện format về thời gian
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhapPhimUploadHinhAnhAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';

export default function Edit(props) {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const thongTinPhim = useSelector(state => state.QuanLyPhimReducer.thongTinPhim);
    const dispatch = useDispatch()
    useEffect(() => {
        let { id } = props.match.params;
        const action = layThongTinPhimAction(id)
        dispatch(action);
    }, [])
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            maNhom: GROUP_ID,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
            trailer: Yup.string().required('trailer không được bỏ trống').matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/, 'địa chỉ đường dẫn không hợp lệ'),
            moTa: Yup.string().required('mô tả không được bỏ trống'),
            ngayKhoiChieu: Yup.date().required('ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.number().typeError('Bạn phải nhập số').min(0, 'tối thiếu là 0').max(10, 'tối đa là 10')



        }),
        onSubmit: (values) => {
            // Đây là đối tượng browser đưa dữ liệu về backend => bảo mật
            console.log(values)
            let frmData = new FormData();
            // frmData.append('tenPhim',values.tenPhim)
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    frmData.append(key, values[key])
                } else {
                    // Nếu hình ảnh không thay đổi sẽ gửi giá trị null về backend-> backend sẽ trả lại hình ảnh cũ
                    if (values.hinhAnh !== null) {
                        frmData.append('File', values.hinhAnh, values.hinhAnh.names);
                    }
                }
            }
            // Gọi api gửi các giá trị formdata về backend xử Lý
            dispatch(capNhapPhimUploadHinhAnhAction(frmData))

            // Nên viết actions

        }
    })

    const handleChangeDatePicker = (date, dateString) => {
        const dateLocal = moment(date);
        //Đưa dữ liệu vào formik

        formik.setFieldValue('ngayKhoiChieu', dateLocal);
    }


    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked);
    }


    const handleChangeFile = async (event) => {
        // Lấy dữ liễu từ file người dùng chọn vào
        let file = event.target.files[0];
        await formik.setFieldValue('hinhAnh', file);
        let reader = new FileReader();
        // Đọc file
        reader.readAsDataURL(file);
        // Sau khi đọc file chạy hàm onload để thay đổi hình
        reader.onload = async (e) => {
            setImgSrc(e.target.result); //hình base64
        }

        // Sau đó set dữ liệu vào useFormik

    }
    return (
        <Fragment>
            <div className="flex">
                <div style={{ width: '200px' }}>
                    <img className="mt-2" src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
                </div>
                <div>
                    <h3 className="text-center">Edit Phim</h3>
                    <Form
                        onSubmitCapture={formik.handleSubmit} //Sự kiện subit của form do ant định nghĩa tương tự onSubmit trong thẻ form ở html 
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 40,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        size={componentSize}
                    >
                        <Form.Item label="Tên Phim">
                            <Input value={formik.values.tenPhim} name="tenPhim" onChange={formik.handleChange} />
                            {formik.touched.tenPhim && formik.errors.tenPhim ? (
                                <div className="text-red-500 italic ">{formik.errors.tenPhim}</div>
                            ) : null}
                        </Form.Item>
                        <Form.Item label="Mô Tả">
                            <Input value={formik.values.moTa} name="moTa" onChange={formik.handleChange} />
                            {formik.touched.moTa && formik.errors.moTa ? (
                                <div className="text-red-500 italic ">{formik.errors.moTa}</div>
                            ) : null}
                        </Form.Item>
                        <Form.Item label="Trailer">
                            <Input value={formik.values.trailer} name="trailer" onChange={formik.handleChange} />
                            {formik.touched.trailer && formik.errors.trailer ? (
                                <div className="text-red-500 italic ">{formik.errors.trailer}</div>
                            ) : null}
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu">
                            <DatePicker value={moment(formik.values.ngayKhoiChieu, 'YYYY-MM-DD')} name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangeDatePicker} />
                            {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                                <div className="text-red-500 italic ">{formik.errors.ngayKhoiChieu}</div>
                            ) : null}

                        </Form.Item>
                        <Form.Item label="Đang chiếu" valuePropName="checked">
                            <Switch checked={formik.values.dangChieu} name="dangChieu" onChange={(checked) => { formik.setFieldValue('sapChieu', checked) }} />
                        </Form.Item>

                        <Form.Item label="Sắp chiếu" valuePropName="checked">
                            <Switch checked={formik.values.sapChieu} name="sapChieu" onChange={(checked) => { handleChangeSwitch('sapChieu', checked) }} />
                        </Form.Item>

                        <Form.Item label="Hot" valuePropName="checked">
                            <Switch checked={formik.values.hot} name="hot" onChange={(checked) => { handleChangeSwitch('hot', checked) }} />
                        </Form.Item>
                        <Form.Item label="Đánh giá">
                            <InputNumber value={formik.values.danhGia} name="danhGia" onChange={(value) => { formik.setFieldValue('danhGia', value) }} />
                            {formik.touched.danhGia && formik.errors.danhGia ? (
                                <div className="text-red-500 italic ">{formik.errors.danhGia}</div>
                            ) : null}
                        </Form.Item>
                        <Form.Item label="Hình ảnh">
                            <input type="file" name="hinhAnh" onChange={handleChangeFile} accept="image/png, image/jpg, image.jpeg, image.gif" />

                        </Form.Item>

                        <Form.Item label="button">
                            <button className="px-2 py-1 transition hover:bg-blue-500 hover:text-white hover:border-0 border border-blue-500 rounded-lg shadow" type="submit">Save</button>
                        </Form.Item>
                    </Form>

                </div>

            </div>
        </Fragment>
    )
}

import React, { useState, Fragment, useEffect } from 'react'
import { useFormik } from 'formik'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { GROUP_ID } from '../../../../util/setting';
// thư viện format về thời gian
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhapPhimUploadHinhAnhAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';

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
        onSubmit: (values) => {
            console.log(values);
            // Đây là đối tượng browser đưa dữ liệu về backend => bảo mật
            let frmData = new FormData();
            // frmData.append('tenPhim',values.tenPhim)
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    frmData.append(key, values[key])
                } else {
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
    console.log(moment(formik.values.ngayKhoiChieu).format('DD/MM/YYYY'))
    const handleChangeDatePicker = (date, dateString) => {
        const dateLocal = moment(date);
        console.log('datelocal', dateLocal);
        //Đưa dữ liệu vào formik

        formik.setFieldValue('ngayKhoiChieu', dateLocal);
    }


    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked);
    }


    const handleChangeFile = async (event) => {
        // Lấy dữ liễu từ file người dùng chọn vào
        let file = event.target.files[0];

        console.log('file', file);
        await formik.setFieldValue('hinhAnh', file);
        let reader = new FileReader();
        // Đọc file
        reader.readAsDataURL(file);
        // Sau khi đọc file chạy hàm onload để thay đổi hình
        reader.onload = async (e) => {
            console.log(e.target.result);
        setImgSrc(e.target.result); //hình base64
        }

        // Sau đó set dữ liệu vào useFormik
        
    }
    return (
        <Fragment>
            <h3>Edit Phim</h3>
            <Form
                onSubmitCapture={formik.handleSubmit} //Sự kiện subit của form do ant định nghĩa tương tự onSubmit trong thẻ form ở html 
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                size={componentSize}
            >
                <Form.Item label="Tên Phim">
                    <Input value={formik.values.tenPhim} name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <Input value={formik.values.moTa} name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input value={formik.values.trailer} name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker value={moment(formik.values.ngayKhoiChieu, 'YYYY-MM-DD')} name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangeDatePicker} />

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
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <input type="file" name="danhGia" onChange={handleChangeFile} accept="image/png, image/jpg, image.jpeg, image.gif" />
                    <img className="mt-2" src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
                </Form.Item>

                <Form.Item label="button">
                    <button className="px-2 py-1 transition hover:bg-blue-500 hover:text-white hover:border-0 border border-blue-500 rounded-lg shadow" type="submit">Save</button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}

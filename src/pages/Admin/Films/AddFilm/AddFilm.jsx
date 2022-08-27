import React , { useState, Fragment } from 'react'
import {useFormik}  from 'formik'
import * as Yup from 'yup'
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
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';

export default function AddFilm() {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc,setImgSrc] = useState('https://picsum.photos/200/200')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom:GROUP_ID,
            ngayKhoiChieu:'',
            dangChieu:false,
            sapChieu:false,
            hot:false,
            danhGia:0,
            hinhAnh:{}
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
            trailer: Yup.string().required('trailer không được bỏ trống').matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/, 'địa chỉ đường dẫn không hợp lệ'),
            moTa: Yup.string().required('mô tả không được bỏ trống'),
            ngayKhoiChieu: Yup.date().required('ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.number().typeError('Bạn phải nhập số').min(0, 'tối thiếu là 0').max(10, 'tối đa là 10'),
            hinhAnh:Yup.object().required('Hình ảnh không được bỏ trống'),
        }),
        onSubmit: (values) => {
            console.log(values);
            // Đây là đối tượng browser đưa dữ liệu về backend => bảo mật
            let frmData = new FormData();
            // frmData.append('tenPhim',values.tenPhim)
            for (let key in values) {
                if(key!=='hinhAnh'){
                    frmData.append(key,values[key])
                }else {
                    frmData.append('File',values.hinhAnh,values.hinhAnh.name)
                }
            }
            // Gọi api gửi các giá trị formdata về backend xử Lý
                dispatch(themPhimUploadHinhAction(frmData))

            // Nên viết actions
           
        }
    })

    const handleChangeDatePicker = (date, dateString) => {
        const dateLocal = moment(date).format('DD/MM/YYYY');
        //Đưa dữ liệu vào formik
        formik.setFieldValue('ngayKhoiChieu',dateLocal);
    }


    const handleChangeSwitch =(name,checked) => {
        formik.setFieldValue(name,checked);
    }


    const handleChangeFile = async (event) => {
        // Lấy dữ liễu từ file người dùng chọn vào
        let file = event.target.files[0];

        console.log('file',file);

        let reader = new FileReader();
        // Đọc file
        reader.readAsDataURL(file);
        // Sau khi đọc file chạy hàm onload để thay đổi hình
        reader.onload = async (e)  => {
            console.log(e.target.result);
            setImgSrc(e.target.result);
        }

        // Sau đó set dữ liệu vào useFormik
        formik.setFieldValue('hinhAnh',file);
    }
  return (
    <Fragment>
            <h3 className="text-center lg:text-left">Thêm Phim</h3>
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
                
                <Form.Item className="text-center lg:text-left" label="Tên Phim">
                    <Input name="tenPhim" onChange={formik.handleChange}/>
                    {formik.touched.tenPhim && formik.errors.tenPhim ? (
                                <div className="text-red-500 italic ">{formik.errors.tenPhim}</div>
                            ) : null}
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                    {formik.touched.moTa && formik.errors.moTa ? (
                                <div className="text-red-500 italic ">{formik.errors.moTa}</div>
                            ) : null}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                    {formik.touched.trailer && formik.errors.trailer ? (
                                <div className="text-red-500 italic ">{formik.errors.trailer}</div>
                            ) : null}
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangeDatePicker} />
                    {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                                <div className="text-red-500 italic ">{formik.errors.ngayKhoiChieu}</div>
                            ) : null}
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={(checked)=>{formik.setFieldValue('sapChieu',checked)}}  />
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={(checked)=>{handleChangeSwitch('sapChieu',checked)}} />
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={(checked)=>{handleChangeSwitch('hot',checked)}} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber name="danhGia" onChange={(value)=>{formik.setFieldValue('danhGia',value)}}  />
                    {formik.touched.danhGia && formik.errors.danhGia ? (
                                <div className="text-red-500 italic ">{formik.errors.danhGia}</div>
                            ) : null}
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type="file" name="hinhAnh" onChange={handleChangeFile} accept="image/png, image/jpg, image.jpeg, image.gif" />
                    <img className = "mt-2" src={imgSrc} alt="..." />
                    {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
                                <div className="text-red-500 italic ">{formik.errors.hinhAnh}</div>
                            ) : null}
                </Form.Item>

                <Form.Item label="Button">
                    <button className="px-2 py-1 transition hover:bg-blue-500 hover:text-white hover:border-0 border border-blue-500 rounded-lg shadow"type="submit">Thêm phim</button>
                </Form.Item>
            </Form>
        </Fragment>
  )
}

import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect,Route} from "react-router";
import { USER_LOGIN } from "../../util/setting";
import { NavLink } from 'react-router-dom'
import {history} from "../../App"
import Header from "../HomeTemplate/Layout/Header/Header";


 const AdminTemplate = (props) => { //path, exac, Component (component truyền từ component sử dụng template)
    const {Component,...restProps} = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        history.push('/login')
    }
    const dispatch = useDispatch()
    const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


    return <Route {...restProps} render={(propsRoute)=>{
        // props.location, props.history, props.match
        // Thuộc tính render của Route giúp ta thêm vào các thuộc tính bên cạnh Compent
        return <Fragment>
                <Header {...propsRoute}/>
            <div className="w-screen h-screen">
    
            <div className="grid grid-cols-12 w-full h-full pr-5" style={{ backgroundColor: 'rgb(255,249,249)' }}>
                <div className="hidden lg:block col-span-2 bg-green-500 rounded-3xl mr-5 ">
                    <div className="flex flex-col h-full rounded-3xl" style={{ backgroundColor: 'rgb(15,21,45)' }}>
                        <div className="flex flex-col items-center justify-center" style={{ height: '30%' }}>
                            <img className="rounded-full w-20 h-20" src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`} alt="123" />
                            <h2 className="text-white my-4 text-2xl">{userLogin.hoTen}</h2>
                            <div style={{ color: 'rgb(243,241,255)' }} className="px-4 py-1 bg-blue-500 rounded-2xl shadow-blue-700 shadow-sm font-medium">{userLogin.maLoaiNguoiDung}</div>
                        </div>
                        <div style={{ height: '70%', backgroundColor: 'rgb(22,36,71)', borderTopRightRadius: '100px' }} className="shadow-3xl py-14 px-8">
                            <div className="flex flex-col h-full justify-between text-white">
                                <ul>
                                    <NavLink to="/admin/dashboard" className="block mb-5 text-slate-400 font-medium ">Dashboard</NavLink>
                                    <li to="/admin/films" className="group block mb-5 text-slate-400 font-medium ">
                                        Films
                                        <ul className="group-hover:block ml-5">
                                           <NavLink to="/admin/films" className="block my-2 text-slate-400">List film</NavLink>
                                           <NavLink className="block text-slate-400"  to="/admin/films/add" >Add film</NavLink> 
                                        </ul>
                                    </li>
                                    <NavLink to="/admin/showtimes" className="block mb-5 text-slate-400 font-medium ">ShowTimes</NavLink>
                                    <NavLink to="/admin/users" className="block mb-5 text-slate-400 font-medium ">Users</NavLink>
                                </ul>
                                <div className="rounded-xl shadow-xl w-full pl-4 py-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                    <p className="mb-0 text-slate-300 font-medium ">Having Trouble?</p>
                                    <p className="mb-0 font-medium text-slate-100">Contact us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-10 pt-20 h-auto ">
                    
                    <Component {...propsRoute} />
                    

                </div>

            </div>
        </div>


        </Fragment>
    }}/>
}

export default AdminTemplate
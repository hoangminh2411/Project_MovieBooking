import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Rate, Modal } from 'antd';
import moment from 'moment'
import { LikeFilled, ExclamationOutlined } from '@ant-design/icons';
import { layDanhSachCommentAction, likeCommentAction } from '../../../redux/actions/QuanLyBinhLuanAction';
import ModalComment from '../../../components/ModalComment/ModalComment';
import { useCallback } from 'react';
import { memo } from 'react';
import unknowUser from '../../../assets/images/unknowUser.png'

import PropTypes from 'prop-types';
import { LIKE_BINH_LUAN_THANH_CONG } from '../../../redux/types/QuanLyBinhLuanType';

function DanhGia({ maPhim }) {
    const [showPopup, setShowPopup] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { discussData } = useSelector(state => state.QuanLyBinhLuanReducer)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachCommentAction())
    }, [dispatch])

    // -------------------------Ant design modal----------------
    const LOGIN_FAIL = userLogin == null
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // ------------------------------------------------------------------
    const renderBinhLuan = () => {
        return discussData.filter((binhLuan) => {
            return binhLuan.maPhim === maPhim.id
        }).map((user, index) => {
            const likeCheck = user?.userLikeThisComment.find((user) => {
                return user === userLogin?.email
            })
            return <div
                key={index}
                className="w-full mb-4 px-5 m-auto bg-white rounded-md"
                style={{ maxWidth: '580px' }}>
                <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                        <img
                            src={`https://i.pravatar.cc/150?u=${user.avtId}`}
                            alt="user avatar"
                            className="rounded-full w-10 h-10 mr-2" />
                        <div className="flex flex-col justify-center">
                            <p className="m-0 uppercase font-medium">{user.username}</p>
                            <p className="m-0 text-xs  text-slate-500 ">
                                {moment(user.createdAt).format('DD/MM/YYYY')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-center m-0 text-green-600 ">{user.point * 2}</p>
                        <Rate
                            disabled
                            allowHalf
                            value={user.point}
                        />
                    </div>
                </div>
                <div className="py-3 mb-1 border-b text-gray-600  border-slate-200 ">
                    {user.post}
                </div>
                <div className="py-4 flex items-center ">
                    <span onClick={() => {
                        if (LOGIN_FAIL) {
                            showModal();
                        }
                        else if (!likeCheck) {
                            dispatch(likeCommentAction(user.id, {
                                ...user,
                                userLikeThisComment: [...user.userLikeThisComment, userLogin?.email],
                            }))
                            dispatch({
                                type: LIKE_BINH_LUAN_THANH_CONG,
                                payload: {
                                    binhLuan: { ...user,userLikeThisComment: [...user.userLikeThisComment, userLogin?.email]},
                                }
                            })
                        } else {
                            const newUser = user.userLikeThisComment.filter((user) => {
                                return user !== userLogin?.email
                            })
                            dispatch({
                                type: LIKE_BINH_LUAN_THANH_CONG,
                                payload: {
                                    binhLuan: { ...user,userLikeThisComment: newUser},
                                }
                            })
                            dispatch(likeCommentAction(user.id, {
                                ...user,
                                userLikeThisComment: newUser,
                            }))
                        }
                    }} className={`mr-3 text-center cursor-pointer ${likeCheck ? 'text-red-500' : 'text-slate-400'}`}><LikeFilled style={{ fontSize: '19px' }} />
                    </span>
                    <span className="text-center text-lg text-slate-400">
                        {user?.userLikeThisComment.length} Thích
                    </span>
                </div>
            </div>

        })
    }
    const handleShowPopUp = useCallback(() => {
        setShowPopup(true);
    }, [])

    const handleClosePopUp = () => {
        setShowPopup(false)
    }
    return (
        <div className="p-6">
            {LOGIN_FAIL ?
                <Modal
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div className="text-4xl text-center text-green-400 rounded-full border-4   border-green-400 border-solid w-20 h-20 flex justify-center items-center mx-auto mb-2">
                        <ExclamationOutlined />
                    </div>
                    <p className="text-center font-bold text-2xl text-gray-500">
                        BẠN CẦN PHẢI ĐĂNG NHẬP
                    </p>
                </Modal> :
                <ModalComment
                    binhLuan={discussData}
                    user={userLogin}
                    maPhim={maPhim}
                    onPopup={showPopup}
                    onClosePopup={handleClosePopUp} />}
            <div onClick={() => {
                if (LOGIN_FAIL) {
                    showModal();
                }
                else {
                    handleShowPopUp();
                }
            }} className="mb-4">
                <div className="w-full h-16  px-5  m-auto flex justify-between items-center cursor-pointer  bg-white rounded-md" style={{ maxWidth: '580px' }}>
                    <div className="flex items-center">
                        {LOGIN_FAIL ?
                            <img
                                src={unknowUser}
                                alt="anoymouse avatar"
                                className="rounded-full w-10 h-10 mr-2" /> :
                            <img
                                src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`}
                                alt="user avatar"
                                className="rounded-full w-10 h-10 mr-2"
                            />}
                        <p className="m-0 text-slate-500 ">
                            Bạn nghĩ gì về phim này?
                        </p>
                    </div>
                    <Rate allowHalf defaultValue={5} />
                </div>
            </div>
            {renderBinhLuan()}
        </div>
    )
}

DanhGia.propTypes = {
    maPhim: PropTypes.object,
}

export default memo(DanhGia)
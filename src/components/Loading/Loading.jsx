import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <>
            { isLoading ?
                <div className="opacity-100 " style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgb(131,182,221)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '99999' }}>
                <img src="https://cdn.dribbble.com/users/4091017/screenshots/14199020/media/37392da70495cb9561dc462c4d137ce2.gif" alt="" />
                </div> : ''

            }
        </>
    )
}

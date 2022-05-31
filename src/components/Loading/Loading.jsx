import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <>
            { isLoading ?
                <div className="opacity-100 " style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgb(27,26,47)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '99999' }}>
                <img src="https://static.collectui.com/shots/4375418/loading-animation-large" alt="" />
                </div> : ''

            }
        </>
    )
}

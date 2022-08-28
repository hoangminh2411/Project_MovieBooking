import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <>
            { isLoading ?
                 <div className="loadingSpinnerContainer">
                 <div className="loadingSpinner"></div>
             </div> : ''

            }
        </>
    )
}

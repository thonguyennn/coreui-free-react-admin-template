/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions'

const OAuth2VietId = () => {
    const dispatch = useDispatch()
    const search = useLocation().search
    const authState = useSelector(state => state.auth)
    const accessToken = new URLSearchParams(search).get('accessToken')
    useEffect(() => {
        dispatch(login({ accessToken }))
    }, [accessToken, dispatch]);


    return authState.isAuthenticated ?
        <Redirect
            to={{
                pathname: "/",
            }}
        />
        : (
            <div>Authenticating VietID</div>
        )
}


export default OAuth2VietId

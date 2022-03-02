/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { login } from '../../../actions'
import useAuth from 'src/hooks/useAuth';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const OAuth2VietId = () => {
    let query = useQuery();
    const { auth, setAuth } = useAuth()
    const dispatch = useDispatch()
    const token = query.get('accessToken')
    // console.log(token)
    // if (token) {
    //     console.log("get token successful")
    // }
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                // const { data } = await authActions.login(token)
                // const { accessToken } = data
                setAuth({ accessToken: token })
                localStorage.setItem('accessToken', token)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchAuth()
    }, [token, dispatch]);

    return auth.accessToken ?
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

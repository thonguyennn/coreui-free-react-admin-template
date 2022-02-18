/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useHistory } from 'react-router-dom';
const CanView = ({ permissions, resource, children }) => {
    const history = useHistory()
    const permission = 'r-' + resource.toLowerCase();
    const isAllowed = permissions.includes(permission);
    if (!isAllowed) history.push('/404')
    return <>{children}</>;
}

export default CanView
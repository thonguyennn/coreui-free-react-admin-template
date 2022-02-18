/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
const CanUpdate = ({ permissions, resource, children }) => {
    const permission = 'u-' + resource.toLowerCase();
    const isAllowed = permissions.includes(permission);
    if (!isAllowed) return <></>
    return <>{children}</>;
}

export default CanUpdate
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import {
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import toasters from '../utils/toasters';
import { useSelector } from "react-redux";

const Toast = () => {
  const listToast = useSelector(state => state.toast);
  return (
    <CToaster
      position={'top-right'}
      key={'toaster'}
    >
      {
        listToast.map(({ status, message }, index) => {
          const { color } = toasters(status || 500);
          return (
            <CToast
              key={'toast' + index}
              show={true}
              autohide={3000}
              fade={true}
            >
              {status &&
                <CToastHeader closeButton={true} style={{ color }}>
                  {status}
                </CToastHeader>}
              <CToastBody style={{ color }}>
                {message}
              </CToastBody>
            </CToast>
          )
        })
      }
    </CToaster>
  );
}

export default Toast;
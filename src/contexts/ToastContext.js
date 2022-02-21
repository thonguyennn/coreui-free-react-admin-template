/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useCallback, useState, createContext } from "react";
import {
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import toasters from '../utils/toasters';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    function (toast) {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <CToaster
        position={'top-right'}
        key={'toaster'}
      >
        {
          toasts.map(({ status, message }, index) => {
            const { color } = toasters(status);
            return (
              <CToast
                key={'toast' + index}
                show={true}
                autohide={3000}
                fade={true}
              >
                <CToastHeader closeButton={true} style={{ color }}>
                  {status}
                </CToastHeader>
                <CToastBody style={{ color }}>
                  {message}
                </CToastBody>
              </CToast>
            )
          })
        }
      </CToaster>
    </ToastContext.Provider>
  );
}

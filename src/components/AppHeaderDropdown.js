/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImage,
  CAvatar,
} from '@coreui/react'
import {
  cilArrowThickFromRight,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch, 
  useSelector 
} from "react-redux";
import {
  // logout,
  getMe 
} from '../actions'
import avatar8 from '../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const history = useHistory();
  const me = useSelector(state => state.me);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      {/* <div className="c-avatar">
          <CImage
            src={`${me.avatar || 'avatars/6.jpg'}`}
            className="c-avatar-img"
            alt={`${me.email || 'alt@email.com'}`}
          />
      </div> */}
      <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2 text-center">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2"/>
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={()=> history.push(`/login`)}>
          <CIcon icon={cilArrowThickFromRight} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

//         <CAvatar src={avatar8} size="md" />

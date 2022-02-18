/* eslint-disable prettier/prettier */
import moment from 'moment';
moment.locale('vi')
const convertTime = (raw) => {
    return moment(raw).format('YYYY-MM-DD HH:mm:ss')
}
export default convertTime;
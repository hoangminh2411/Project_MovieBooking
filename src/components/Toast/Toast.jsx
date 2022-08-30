
import {notification} from 'antd';


export default function Toast(type,title,desp) {
    
  return (
    notification[type]({
        message: title,
        description:desp
      })
  )
}

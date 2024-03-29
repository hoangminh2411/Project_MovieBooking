import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './components/GlobalStyle';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

// Cài thư viện antd design
import 'antd/dist/antd.css';


// Reacts slick 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN_CYBERBUG } from './util/setting';


// Cấu hình realtime (websocket với signalR)
import * as singalR from '@aspnet/signalr'



// Đoạn code để kết nối sever lắng nghe sự kiện từ sever
export const connection = new singalR.HubConnectionBuilder().withUrl(`${DOMAIN_CYBERBUG}/DatVeHub`)?.configureLogging(singalR.LogLevel.Information)?.build();

// connection.start().then(() => {
//   console.log('SignalR Connected');

//   ReactDOM.render(
//       <Provider store={store}>
//         <GlobalStyles>
//           <App />
//         </GlobalStyles>
//       </Provider>,
//     document.getElementById('root')
//   );
// }).catch(errors => {
//   console.log(errors);
//   Toast('error','ERROR',"Mất kết nối internet")
// })
ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

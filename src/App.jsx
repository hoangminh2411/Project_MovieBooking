import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';

import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Detail_mobile from './pages/Detail/Detail_mobile'
import  CheckoutTemplate  from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import ModalResult from './pages/Checkout/ModalResult/ModalResult';
import Profile from './pages/Profile/Profile';
import Loading from './components/Loading/Loading';
import ProfileV2 from './pages/Profile/ProfileV2';

// import {Suspense, lazy} from 'react'

// const CheckoutTemplateLazy = lazy(()=> import('./templates/CheckoutTemplate/CheckoutTemplate'))


// Thư viện hổ trợ di chuyển giữa các router
export const history = createBrowserHistory();

function App() {
  return (
    <div className="app">
      <Loading/>
      <Router history={history}>
        <Switch>


          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} mobileComponent={Detail_mobile} />
          <UserTemplate path="/login" exact Component={Login} />
          <UserTemplate path="/register" exact Component={Register} />
          <HomeTemplate path="/" exact Component={Home} />
          <CheckoutTemplate path="/checkout/:id" exact component={Checkout} />
          {/* <Suspense fallback={<h1>LOADING...</h1>}>
            <CheckoutTemplateLazy path="/checkout/:id" exact component={Checkout} />
          </Suspense> */}
          <HomeTemplate path="/profile" exact Component ={ProfileV2} />
        </Switch>
      </Router>


    </div>


  );
}

export default App;

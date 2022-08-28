
import './App.css';
import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';

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
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';

import Films from './pages/Admin/Films/Films';
import ShowTimes from './pages/Admin/Films/ShowTimes/ShowTimes';
import Users from './pages/Admin/Users/Users';
import AddFilm from './pages/Admin/Films/AddFilm/AddFilm';
import Edit from './pages/Admin/Films/Edit/Edit';
import Nomatch from './components/Nomatch/Nomatch';

// import {Suspense, lazy} from 'react'

// const CheckoutTemplateLazy = lazy(()=> import('./templates/CheckoutTemplate/CheckoutTemplate'))
  // const LazyHome = React.lazy(()=>import('./pages/Home/Home'))

// Thư viện hổ trợ di chuyển giữa các router
export const history = createBrowserHistory();

function App() {
  return (
    <div className="app">
      <Loading/>
      <Router history={history}>
        <Switch>


          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/" exact Component={Home} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} mobileComponent={Detail_mobile} />
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
          <HomeTemplate path="/profile" exact Component ={ProfileV2} />


          <UserTemplate path="/login" exact Component={Login} />
          <UserTemplate path="/register" exact Component={Register} />

          <AdminTemplate path="/admin/dashboard" exact Component={Dashboard} />
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/films/add" exact Component={AddFilm} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
          <AdminTemplate path="/admin/films/showtimes/:id" exact Component={ShowTimes} />
          <AdminTemplate path="/admin/users" exact Component={Users} />


          <Route exact component={Nomatch}/>
        </Switch>
      </Router>


    </div>


  );
}

export default App;

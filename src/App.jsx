import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from 'history' 
import {Router,Switch,Route} from 'react-router-dom'
import { HomeTeplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';


// Thư viện hổ trợ di chuyển giữa các router
export const history = createBrowserHistory();

function App() {
  return (
    <div className="app">
      <Router history={history}>
        <Switch>


          <HomeTeplate path="/home" exact Component={Home}/>
          <HomeTeplate path="/contact" exact Component={Contact}/>
          <HomeTeplate path="/news" exact Component={News}/>
          <HomeTeplate path="/detail/:id" exact Component={Detail}/>
          <Route path="/login" exact Component={Login} />
          <Route path="/register" exact Component={Register} />
          <HomeTeplate path="/" exact Component={Home}/>

        </Switch>
      </Router>
      

    </div>


  );
}

export default App;

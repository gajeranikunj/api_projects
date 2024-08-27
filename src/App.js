import Mainbody from './components/Mainbody';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Apidataprovider } from './Apidata_and_fun/ApiDataprovider';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <>
      <Apidataprovider>
        <Switch>
          <Route path="/adminpanel/register">
            <Register />
          </Route>

          <Route path="/adminpanel/login">
            <Login />
          </Route>

          <Route path="/adminpanel">
            <Mainbody />
          </Route>
          <Route path="/">
            <Link to="/adminpanel">
            ad
            </Link>
          </Route>
        </Switch>
      </Apidataprovider>
    </>
  );
}

export default App;

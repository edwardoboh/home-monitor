// import './App.css';
// import Welcome from './components/Welcome';
import Navigation from './components/admin/Navigation';
// import CompTest from './CompTest'
import {Provider} from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './components/Login'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <PublicRoute path="/login">
            <Login />
        </PublicRoute>
        <PrivateRoute path="/dashboard">
        <Provider store={store}>
          <div className="App">
            {/* <Welcome /> */}
            <Navigation />
            {/* <CompTest /> */}
          </div>
        </Provider>
        </PrivateRoute>
      </Switch>
    </Router>
    
  );
}

export default App;

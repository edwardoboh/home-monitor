// import './App.css';
// import Welcome from './components/Welcome';
import Navigation from './components/admin/Navigation';
// import CompTest from './CompTest'
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Welcome /> */}
        <Navigation />
        {/* <CompTest /> */}
      </div>
    </Provider>
  );
}

export default App;

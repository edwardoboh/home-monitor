import Navigation from './components/admin/Navigation';
import {Provider} from 'react-redux'
import store from './store'
import Welcome from './components/Welcome';


function App() {
  return (
    <Provider store={store}>
      <Navigation />
      {/* <Welcome /> */}
    </Provider>
    
  );
}

export default App;

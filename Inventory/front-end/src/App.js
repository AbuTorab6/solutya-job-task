
import {Routes,Route,BrowserRouter} from 'react-router-dom'

import SideNavigation from './components/MasterLayout/SideNavigation';
import DashboardPage from './pages/dashboard/DashboardPage';

import FullScreenLoader from './components/MasterLayout/FullScreenLoader';


import MyRouter from './router/MyRouter';

function App() {
  return (
    <div className="App">
      <MyRouter/>
      <FullScreenLoader/>
    </div>
  );
}

export default App;

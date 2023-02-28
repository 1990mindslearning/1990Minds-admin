import React from 'react';
import './App.less'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components'
import PrivateVendorRoute from './components/auth/privateRoute'
import Login from './components/auth/login 31Oct'
import ShowVersion from './components/auth/version'


function App() {

  return (  
  
  <Router>
    <main className="App">

   <PrivateVendorRoute path="/dashboard" component={Dashboard} />
   <Route path="/" component={Login} exact/>
   <Route path ="/version-release" component={ ShowVersion }/>
   
  
     </main>
    </Router>
  );
}

export default App;

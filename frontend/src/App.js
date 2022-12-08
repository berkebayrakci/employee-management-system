import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Login from './components/home/Login'
import AdminPage from './components/admin/AdminPage'
import EmployeePage from './components/employee/EmployeePage'
import AddEmployee from './components/admin/AddEmployee';
import UpdateEmployee from './components/admin/UpdateEmployee';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login} />
          <Route path='/adminpage' component={AdminPage} />
          <Route path = "/add-employee" component={AddEmployee} />
          <Route path = "/edit-employee/:username"
           component={UpdateEmployee} />
          <Route path='/employeepage' element={EmployeePage} />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;

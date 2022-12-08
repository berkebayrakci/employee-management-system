import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext'

function Navbar(){
    const { getEmployee, employeeIsAuthenticated, employeeLogout} = useAuth()
    const logout = () => {
        employeeLogout()
    }
    const enterMenuStyle = () => {
        return employeeIsAuthenticated() ? {"display":"none"} : {"display" : "block"}
    }
        const logoutMenuStyle = () => {
        return employeeIsAuthenticated() ? { "display": "block" } : { "display": "none" }
    }
    const adminPageStyle = () => {
        const employee = getEmployee()
        return employee && employee.role === 'ADMIN' ? { "display": "block" } : { "display": "none" } 
    }
    const employeePageStyle = () => {
        const employee = getEmployee()
        return employee && employee.role === 'EMPLOYEE' ? { "display": "block" } : { "display": "none" }
    }
        const getEmployeeName = () => {
        const employee = getEmployee()
        return employee ? employee.name : ''
    }
    return(
        <Menu inverted color='blue' stackable size='massive' style={{borerRadius : 1}}>
            <Container>
                <Menu.Item header>Employee Management System</Menu.Item>
                <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
                <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()}>Admin Page</Menu.Item>
                <Menu.Item as={Link} to="/employeepage" style={employeePageStyle()}>Employee Page</Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
                    <Menu.Item header style={logoutMenuStyle()}>{`Hi ${getEmployeeName()}`}</Menu.Item>
                    <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>    )}
export default Navbar
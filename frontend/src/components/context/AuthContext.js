import React, {Component, useContext } from 'react';

const AuthContext = React.createContext()

class AuthProvider extends Component{

    state = { 
        employee: null }
    componentDidMount() {
        const employee = localStorage.getItem('employee')
        this.setState({ employee })}
    getEmployee = () => {
        return JSON.parse(localStorage.getItem('employee'))}
    employeeIsAuthenticated = () => {
        return localStorage.getItem('employee') !== null}
    employeeLogin = (employee) => {
        localStorage.setItem('employee', JSON.stringify(employee))
        this.setState({ employee })}
    employeeLogout = () => {
        localStorage.removeItem('employee')
        this.setState({ employee : null})}
    render(){
        const { children } = this.props
        const { employee } = this.state;
        const { getEmployee, employeeIsAuthenticated, employeeLogin, employeeLogout} = this
        
        return(
            <AuthContext.Provider value={{employee, getEmployee,
             employeeIsAuthenticated, employeeLogin, employeeLogout }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}
export { AuthProvider }
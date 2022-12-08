import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {useAuth} from'../context/AuthContext'

function PrivateRoute({component: Component, ...rest}){
    const { employeeIsAuthenticated } = useAuth()

    return <Route {...rest} render = {props => (
        employeeIsAuthenticated() ?
         <Component {...props} /> :
          <Redirect to={{ pathname: '/login', state: {referer: props.history} }} />
    )} />
}
export default PrivateRoute
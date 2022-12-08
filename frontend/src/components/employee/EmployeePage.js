import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import AuthContext from '../context/AuthContext';
import { emsApi } from '../misc/EmsApi';

class EmployeePage extends Component{
    static contextType = AuthContext

    state = {
        isEmployee: true,
    }

    componentDidMount(){
        const Auth = this.context
        const employee = Auth.getEmployee()
        const isEmployee = employee.role === 'EMPLOYEE'
        this.setState( {isEmployee} )
    }

    handleInputChange = (e, {name, value}) => {
        this.setState( { [name]: value } )
    }
    
    render(){
        if(!this.state.isEmployee){
            return <Redirect to='/' />
        } else{
            return (
                <div>
                    Hello
                </div> 
            )
        }
    }
}
export default EmployeePage
import React, {Component} from 'react';
import { NavLink, Redirect, withRouter} from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import AuthContext from '../context/AuthContext';
import { emsApi } from '../misc/EmsApi';
import { handleLogError } from '../misc/Helpers';

class UpdateEmployee extends Component{
    static contextType = AuthContext

    state = {
        employee: '',username:'',password:'',name:'',lastname:'',email:'',
        isError:false,
        updated: false,
        errorMessage:''
    }
    componentDidMount(){
        const username = this.props.match.params.username;
        const Auth = this.context
        const employee = Auth.getEmployee()
        this.setState( {employee: employee} )
        this.getEmployee(username,employee);
    }
    getEmployee = (username, employee) => {
        emsApi.getEmployees(employee, username)
        .then(res => {
            this.setState({ username: res.data.username })
            this.setState({ name: res.data.name })
            this.setState({ lastname: res.data.lastname })
            this.setState({ password: res.data.password })
            this.setState({ email: res.data.email })
        })
        .catch(error => {
            handleLogError(error)
        })}
    handleInputChange = (e, {name, value}) => {
        this.setState({ [name]: value })}
    handleSubmit = (e) => {
        e.preventDefault()
        const{ employee, lastname, name, email, password, username } = this.state
        if (!( name && email && lastname)) {
            this.setState({
              isError: true,
              errorMessage: 'Please, inform all fields!'
            })
            return}
        const updated_employee = {username, name, lastname, email, password }
        emsApi.updateEmployee( employee, username, updated_employee )
        .then(() => {
            console.log('Employee Updated!')
            this.setState({ updated: true})
        })
        .catch(error => {
            handleLogError(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data
                let errorMessage = 'Invalid fields'
                if (errorData.status === 409) {
                  errorMessage = errorData.message
                } else if (errorData.status === 400) {
                  errorMessage = errorData.errors[0].defaultMessage
                }
                this.setState({
                  isError: true,
                  errorMessage
                })
            }
        })
    }

    render(){
        const {isError, errorMessage, updated} = this.state

        if(updated){
            return <Redirect to='/adminpage' />
        }else{
            const { name, lastname, email, password} = this.state
            return(
                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment>
                                <Form.Input
                                fluid
                                name='name'
                                icon='address card'
                                iconPosition='left'
                                placeholder='Name' value={name}
                                onChange={this.handleInputChange}
                                />
                                <Form.Input fluid name='password' icon='lock' iconPosition="left"
                                placeholder='Password' type="password" value={password}
                                 onChange={this.handleInputChange}
                                />     
                            <Form.Input
                                fluid
                                name='lastname'
                                icon='address card'
                                iconPosition='left'
                                placeholder='Last Name' value={lastname}
                                onChange={this.handleInputChange}
                                />
                                <Form.Input
                                fluid
                                name='email'
                                icon='at'
                                iconPosition='left'
                                placeholder='Email' value={email}
                                onChange={this.handleInputChange}
                                />                                                                                        
                            <Button color='blue' fluid size='large'> Update Employee </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Button color='red' fluid size='medium'><a href='/adminpage' color='teal' as={NavLink} to='/adminpage'> Cancel </a></Button>
                        </Message>
                        {isError && <Message negative>{errorMessage}</Message>}
                    </Grid.Column>
                </Grid>
            )
        }
    }
    
}
export default withRouter(UpdateEmployee)
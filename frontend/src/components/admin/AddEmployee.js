import React, {Component} from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { emsApi } from "../misc/EmsApi";
import { handleLogError } from "../misc/Helpers";


class AddEmployee extends Component{
    static contextType = AuthContext

    state = {
        username:'', password:'',name:'',lastname:'',email:'',
        isError:false,
        created: false,
        errorMessage:''
    }

    componentDidMount(){
        // const Auth = this.context
        // const isLoggedIn = Auth.employeeIsAuthenticated()
        // this.setState({isLoggedIn})
    }

    handleInputChange = (e, {name, value}) => {
        this.setState({ [name]: value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password, name, lastname, email } = this.state
        if (!(username && password && name && email && lastname)) {
          this.setState({
            isError: true,
            errorMessage: 'Please, inform all fields!'
          })
          return
        }
        const employee = {username, name, lastname, password, email}
        emsApi.createemployee(employee)
        .then(() => {
            console.log('Employee Created!')
            this.setState({created: true})
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

        const {isError, errorMessage, created} = this.state

        if(created){
            return <Redirect to='/adminpage' />
        }else{
            return(
                <Grid textAlign="center">
                    <Grid.Column style = {{ maxWidth: 450 }}>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment>
                                <Form.Input fluid autoFocus name='username' icon='user'
                                            iconPosition="left" placeholder='Username'
                                            onChange={this.handleInputChange}
                                />
                                <Form.Input fluid name='password' icon='lock' iconPosition="left"
                                            placeholder='Password' type="password"
                                            onChange={this.handleInputChange}
                                />
                                <Form.Input
                                fluid
                                name='name'
                                icon='address card'
                                iconPosition='left'
                                placeholder='Name'
                                onChange={this.handleInputChange}
                                />
                            <Form.Input
                                fluid
                                name='lastname'
                                icon='address card'
                                iconPosition='left'
                                placeholder='Last Name'
                                onChange={this.handleInputChange}
                                />
                                <Form.Input
                                fluid
                                name='email'
                                icon='at'
                                iconPosition='left'
                                placeholder='Email'
                                onChange={this.handleInputChange}
                                />
                                <Button color="blue" fluid size="large"> Add Employee </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Button color="olive" fluid size="medium"><a href="/adminpage" color="teal" as={NavLink} to='/adminpage'> Cancel </a> </Button>
                        </Message>
                        {isError && <Message negative>{errorMessage}</Message>}
                    </Grid.Column>
                </Grid>
            )
        }
    }
}
export default AddEmployee
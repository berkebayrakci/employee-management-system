import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { emsApi } from '../misc/EmsApi'
import { handleLogError } from '../misc/Helpers'
import { Link } from 'react-router-dom'

class AdminPage extends Component {
  static contextType = AuthContext

  state = {
    employees: [],
    employeeUsernameSearch: '',
    isAdmin: true,
    isEmployeesLoading: false
  }
  componentDidMount() {
    const Auth = this.context
    const employee = Auth.getEmployee()
    const isAdmin = employee.role === 'ADMIN'
    this.setState({ isAdmin })
    this.handleGetEmployees()
  }
  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }
  handleGetEmployees = () => {
    const Auth = this.context
    const employee = Auth.getEmployee()

    this.setState({ isEmployeessLoading: true })
    emsApi.getEmployees(employee)
      .then(response => {
        this.setState({ employees: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isEmployeesLoading: false })
      })
  }

  handleDeleteEmployee = (username) => {
    const Auth = this.context
    const employee = Auth.getEmployee()

    emsApi.deleteEmployee(employee, username)
      .then(() => {
        this.handleGetEmployees()
      })
      .catch(error => {
        handleLogError(error)
      })
  }


  render() {
    if (!this.state.isAdmin) {
      return <Redirect to='/' />
    } else {
      const { employees } = this.state
      return (
        <div className='container'>
            
            <h2 className='text-center'>List Employees</h2>
            <Link to = "/add-employee" className = "btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> Employee Username </th>
                        <th> Employee First Name </th>
                        <th> Employee Last Name </th>
                        <th> Employee Email</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.username}> 
                                <td> {employee.username} </td>
                                <td> {employee.name} </td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                 <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.username}`} >Update</Link>
                                    <button className = "btn btn-danger" disabled={employee.username === 'admin'} onClick = {
                                      () => this.handleDeleteEmployee(employee.username)}
                                    style = {{marginLeft:"10px"}}> Delete </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      )
    }
  }
}

export default AdminPage
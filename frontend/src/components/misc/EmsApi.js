import axios from "axios";
import {config} from '../../Constants'

export const emsApi = {
    authenticate,
    numberOfEmployees,
    getEmployees,
    createemployee,
    updateEmployee,
    deleteEmployee}
function authenticate(username, password){
    return instance.post('/auth/authenticate',{username,password},{
        headers:{'Content-type' : 'application/json'}})}

function createemployee(employee){
    return instance.post('/auth/createemployee',employee,{
        headers:{'Content-type' : 'application/json'}})}

function numberOfEmployees(){
    return instance.get('/public/numberOfEmployees')}

function getEmployees(employee, username){
    const url = username ? `/api/employees/${username}` : '/api/employees'

    return instance.get(url, {
        headers: {'Authorization' : basicAuth(employee) }})}

function updateEmployee( employee, username, new_employee){
    return instance.put(`/api/employees/edit/${username}`, new_employee,{
        headers: {'Authorization' : basicAuth(employee), 'Content-type' : 'application/json' }})}

function deleteEmployee(employee, username){
    return instance.delete(`/api/employees/${username}`, {
        headers: {'Authorization' : basicAuth(employee)}})}
// Axios Pre-Load
const instance = axios.create({
    baseURL: config.url.API_BASE_URL})
// Helper Function
function basicAuth(employee){
    return `Basic ${employee.authdata}`}
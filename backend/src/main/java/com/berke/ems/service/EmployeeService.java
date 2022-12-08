package com.berke.ems.service;

import com.berke.ems.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getEmployees();
    Optional<Employee> getEmployeeByUsername(String username);
    boolean hasEmployeeWithUsername(String username);

    boolean hasEmployeeWithEmail(String email);

    Employee validateAndGetEmployeeByUsername(String username);

    Employee saveEmployee(Employee employee);

    void deleteEmployee(Employee employee);

    Optional<Employee> validUsernameAndPassword(String username, String password);
}

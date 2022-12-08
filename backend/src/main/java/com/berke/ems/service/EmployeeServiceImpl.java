package com.berke.ems.service;

import com.berke.ems.exception.EmployeeNotFoundException;
import com.berke.ems.model.Employee;
import com.berke.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }

    @Override
    public boolean hasEmployeeWithUsername(String username) {
        return employeeRepository.existsByUsername(username);
    }

    @Override
    public boolean hasEmployeeWithEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }

    @Override
    public Employee validateAndGetEmployeeByUsername(String username) {
        return getEmployeeByUsername(username).orElseThrow(() ->
                new EmployeeNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Employee employee) {
        employeeRepository.delete(employee);
    }

    @Override
    public Optional<Employee> validUsernameAndPassword(String username, String password) {
        return getEmployeeByUsername(username)
                .filter(employee -> passwordEncoder.matches(password, employee.getPassword()));
    }
}

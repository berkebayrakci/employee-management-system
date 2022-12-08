package com.berke.ems.rest;

import com.berke.ems.exception.DuplicatedEmployeeInfoException;
import com.berke.ems.model.Employee;
import com.berke.ems.rest.dto.AuthResponse;
import com.berke.ems.rest.dto.CreateEmployeeRequest;
import com.berke.ems.rest.dto.LoginRequest;
import com.berke.ems.security.WebSecurityConfig;
import com.berke.ems.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final EmployeeService employeeService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<Employee> employeeOptional =
                employeeService.validUsernameAndPassword(loginRequest.getUsername(),
                                                         loginRequest.getPassword());
        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            return ResponseEntity.ok(new AuthResponse(employee.getId(),
                    employee.getName(),employee.getLastname(), employee.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/createemployee")
    public AuthResponse createEmployeeRequest(@Valid @RequestBody
                                                  CreateEmployeeRequest createEmployeeRequest) {
        if (employeeService.hasEmployeeWithUsername(createEmployeeRequest.getUsername())) {
            throw new DuplicatedEmployeeInfoException(String.
                    format("Username %s is already been used", createEmployeeRequest.getUsername()));
        }
        if (employeeService.hasEmployeeWithEmail(createEmployeeRequest.getEmail())) {
            throw new DuplicatedEmployeeInfoException(String.
                    format("Email %s is already been used", createEmployeeRequest.getEmail()));
        }

        Employee employee = employeeService.saveEmployee(createEmployee(createEmployeeRequest));
        return new AuthResponse(employee.getId(), employee.getName(),
                employee.getLastname(), employee.getRole());
    }

    private Employee createEmployee(CreateEmployeeRequest createEmployeeRequest) {
        Employee employee = new Employee();
        employee.setUsername(createEmployeeRequest.getUsername());
        employee.setPassword(createEmployeeRequest.getPassword());
        employee.setName(createEmployeeRequest.getName());
        employee.setLastname(createEmployeeRequest.getLastname());
        employee.setEmail(createEmployeeRequest.getEmail());
        employee.setRole(WebSecurityConfig.EMPLOYEE);
        return employee;
    }
}

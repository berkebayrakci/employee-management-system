package com.berke.ems.rest;

import com.berke.ems.mapper.EmployeeMapper;
import com.berke.ems.model.Employee;
import com.berke.ems.rest.dto.EmployeeDto;
import com.berke.ems.security.CustomEmployeeDetails;
import com.berke.ems.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.berke.ems.config.SwaggerConfig.BASIC_AUTH_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@Configuration
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeMapper employeeMapper;

    @GetMapping
    public List<EmployeeDto> getEmployees() {
        return employeeService.getEmployees().stream()
                .map(employeeMapper::toEmployeeDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping("/{username}")
    public EmployeeDto getEmployee(@PathVariable String username) {
        return employeeMapper.toEmployeeDto(employeeService.validateAndGetEmployeeByUsername(username));
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping("/me")
    public EmployeeDto getCurrentEmployee(@AuthenticationPrincipal CustomEmployeeDetails currentEmployee){
        return employeeMapper.toEmployeeDto(
                employeeService.validateAndGetEmployeeByUsername(currentEmployee.getUsername()));
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @PutMapping("/edit/{username}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String username,
                                                   @RequestBody Employee employeeDetails){

        Employee updateEmployee = employeeService.validateAndGetEmployeeByUsername(username);

        updateEmployee.setUsername(employeeDetails.getUsername());
        updateEmployee.setName(employeeDetails.getName());
        updateEmployee.setLastname(employeeDetails.getLastname());
        updateEmployee.setEmail(employeeDetails.getEmail());
        updateEmployee.setPassword(employeeDetails.getPassword());

        employeeService.saveEmployee(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @DeleteMapping("/{username}")
    public EmployeeDto deleteEmployee(@PathVariable String username) {
        Employee employee= employeeService.validateAndGetEmployeeByUsername(username);
        employeeService.deleteEmployee(employee);
        return employeeMapper.toEmployeeDto(employee);
    }
}

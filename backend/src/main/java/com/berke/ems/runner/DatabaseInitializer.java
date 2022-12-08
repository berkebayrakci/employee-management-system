package com.berke.ems.runner;

import com.berke.ems.model.Employee;
import com.berke.ems.security.WebSecurityConfig;
import com.berke.ems.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final EmployeeService employeeService;

    @Override
    public void run(String... args){
        if(!employeeService.getEmployees().isEmpty()){
            return;
        }
        EMPLOYEES.forEach(employeeService::saveEmployee);
        log.info("Database initialized");
    }
    private static final List<Employee> EMPLOYEES = Arrays.asList(
            new Employee("admin", "admin", "Admin", "Admin","admin@mycompany.com",
                    WebSecurityConfig.ADMIN),
            new Employee("user", "user", "User","User", "user@mycompany.com",
                    WebSecurityConfig.EMPLOYEE)
    );
}

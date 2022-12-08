package com.berke.ems.rest;

import com.berke.ems.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class PublicController {
    private final EmployeeService employeeService;

    @GetMapping("/numberOfEmployees")
    public Integer getNumberOfEmployees(){
     return employeeService.getEmployees().size();
    }

}

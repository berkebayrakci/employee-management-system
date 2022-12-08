package com.berke.ems.security;

import com.berke.ems.model.Employee;
import com.berke.ems.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EmployeeDetailsServiceImpl implements UserDetailsService {

    private final EmployeeService employeeService;

    @Override
    public UserDetails loadUserByUsername(String username){
        Employee employee = employeeService.getEmployeeByUsername(username).orElseThrow(()
                -> new UsernameNotFoundException(String.format("Username %s not found", username)));
        List<SimpleGrantedAuthority> authorities = Collections
                .singletonList(new SimpleGrantedAuthority(employee.getRole()));

        return mapEmployeeToCustomEmployeeDetails(employee, authorities);
    }

    private CustomEmployeeDetails mapEmployeeToCustomEmployeeDetails(Employee employee
            , List<SimpleGrantedAuthority> authorities){
        CustomEmployeeDetails customEmployeeDetails = new CustomEmployeeDetails();

        customEmployeeDetails.setId(employee.getId());
        customEmployeeDetails.setUsername(employee.getUsername());
        customEmployeeDetails.setPassword(employee.getPassword());
        customEmployeeDetails.setName(employee.getName());
        customEmployeeDetails.setLastname(employee.getLastname());
        customEmployeeDetails.setEmail(employee.getEmail());

        customEmployeeDetails.setAuthorities(authorities);

        return customEmployeeDetails;
    }
}

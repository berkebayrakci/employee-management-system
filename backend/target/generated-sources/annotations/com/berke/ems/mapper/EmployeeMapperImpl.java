package com.berke.ems.mapper;

import com.berke.ems.model.Employee;
import com.berke.ems.rest.dto.EmployeeDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-26T19:10:54+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class EmployeeMapperImpl implements EmployeeMapper {

    @Override
    public EmployeeDto toEmployeeDto(Employee employee) {
        if ( employee == null ) {
            return null;
        }

        Long id = null;
        String username = null;
        String name = null;
        String email = null;
        String lastname = null;
        String role = null;

        id = employee.getId();
        username = employee.getUsername();
        name = employee.getName();
        email = employee.getEmail();
        lastname = employee.getLastname();
        role = employee.getRole();

        EmployeeDto employeeDto = new EmployeeDto( id, username, name, email, lastname, role );

        return employeeDto;
    }
}

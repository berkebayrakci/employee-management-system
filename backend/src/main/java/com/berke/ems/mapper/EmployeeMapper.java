package com.berke.ems.mapper;

import com.berke.ems.model.Employee;
import com.berke.ems.rest.dto.EmployeeDto;
import org.mapstruct.Mapper;
import org.springframework.context.annotation.Configuration;

@Configuration
@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    EmployeeDto toEmployeeDto(Employee employee);
}

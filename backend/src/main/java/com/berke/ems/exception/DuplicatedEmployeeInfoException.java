package com.berke.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicatedEmployeeInfoException extends RuntimeException {
    public DuplicatedEmployeeInfoException(String message){
        super(message);
    }
}

package com.edu.um.programacion2.web.rest.vm;

import com.edu.um.programacion2.domain.enumeration.Sexo;
import com.edu.um.programacion2.service.dto.UserDTO;

import java.time.LocalDate;

import javax.validation.constraints.Size;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;
    
    private LocalDate fechaNacimiento;
    
    private Sexo sexo;

    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getfechaNacimiento() {
        return fechaNacimiento;
    }
    
    public Sexo getSexo() {
        return sexo;
    }
    
    @Override
    public String toString() {
        return "ManagedUserVM{" +
            "} " + super.toString();
    }
}

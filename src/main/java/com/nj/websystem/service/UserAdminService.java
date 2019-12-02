package com.nj.websystem.service;

import com.nj.websystem.enums.Status;
import com.nj.websystem.model.UserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserAdminService extends JpaRepository<UserAdmin, Long> {

    // List<UserAdmin> findUserAdminByStatus(Status status);

    //@Query("From UserAdmin ORDER BY lastDateModified DESC")
    //List<UserAdmin> findAll();

}

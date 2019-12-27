package com.nj.websystem;

import com.nj.websystem.controller.LoggingController;
import com.nj.websystem.enums.Status;
import com.nj.websystem.enums.UserRoles;
import com.nj.websystem.model.UserAdmin;
import com.nj.websystem.service.UserAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class WebSystemApplication {

    static Logger logger = LoggerFactory.getLogger(WebSystemApplication.class);

    @Autowired
    private UserAdminService services;

    public static void main(String[] args) {
        SpringApplication.run(WebSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner CommandLineRunner() {
        System.out.println("System starting ......");
        List<UserAdmin> adminUsers =new ArrayList<>();
        adminUsers.add(new UserAdmin(1L,"admin", "admin", "admin", "admin", UserRoles.ADMIN, "admin", new Date(), "system"));
        adminUsers.add(new UserAdmin(2L,"manjula", "Manjula", "Ranathunga", "manjula", UserRoles.ADMIN, "admin", new Date(), "system"));
        adminUsers.add(new UserAdmin(3L,"nuwan", "Nuwan", "Jayasooriya", "nuwan", UserRoles.ADMIN, "admin", new Date(), "system"));
        adminUsers.add(new UserAdmin(4L,"test", "Test", "User", "test", UserRoles.USER, "admin", new Date(), "system"));
        services.saveAll(adminUsers);
        return args -> {
            logger.info("Started ...");
        };
    }
}

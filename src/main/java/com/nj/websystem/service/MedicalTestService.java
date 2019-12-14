package com.nj.websystem.service;

import com.nj.websystem.enums.TestType;
import com.nj.websystem.model.MedicalTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicalTestService extends JpaRepository<MedicalTest, Long> {

    List<MedicalTest> findById(String id);

    @Query("From MedicalTest ORDER BY name ASC")
    List<MedicalTest> findAll();

    List<MedicalTest> findAllByTestType(TestType testType);

}

package com.nj.websystem.service;

import com.nj.websystem.enums.TestType;
import com.nj.websystem.model.PatientMedicalTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientMedicalTestService extends JpaRepository<PatientMedicalTest, Long> {

    List<PatientMedicalTest> findById(String id);

    @Query("From PatientMedicalTest ORDER BY dateCreated DESC")
    List<PatientMedicalTest> findAll();

    List<PatientMedicalTest> findAllByPatientIdAndTestType(String patientId, TestType testType);


}

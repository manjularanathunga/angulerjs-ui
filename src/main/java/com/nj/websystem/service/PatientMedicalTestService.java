package com.nj.websystem.service;

import com.nj.websystem.enums.Status;
import com.nj.websystem.enums.TestType;
import com.nj.websystem.model.PatientMedicalTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PatientMedicalTestService extends JpaRepository<PatientMedicalTest, Long> {

    List<PatientMedicalTest> findById(String id);

    @Query("From PatientMedicalTest ORDER BY dateCreated DESC")
    List<PatientMedicalTest> findAll();

    List<PatientMedicalTest> findAllByTestTypeAndDateCreated(TestType testType, Date dateCreated);

    public List<PatientMedicalTest> getAllByTestType(TestType testType);

    public List<PatientMedicalTest> getAllByTestTypeAndDateCreatedBetween(TestType testType,Date startDate,Date endDate);

    public List<PatientMedicalTest> findAllByDateCreatedBetweenAndTestType(Date startDate, Date endDate,TestType testType);

    List<PatientMedicalTest> findAllByPatientIdAndTestType(String patientId, TestType testType);

    List<PatientMedicalTest> findAllByPatientIdAndBillingNumber(String patientId, String billingNumber);

    List<PatientMedicalTest> findAllByBillingNumber(String billingNumber);

    List<PatientMedicalTest> findAllByBillingNumberAndStatus(String billingNumber, Status status);

    public List<PatientMedicalTest> getAllByTestTypeOrderByIdDesc(TestType testType);


}

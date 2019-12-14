package com.nj.websystem.service;

import com.nj.websystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientService extends JpaRepository<Patient, Long> {

    List<Patient> findByPatientId(String patientId);

    List<Patient> findByNicNumber(String nicNumber);

    // @Query("From MedicalTest ORDER BY patient_name ASC")
    List<Patient> findAll();


}

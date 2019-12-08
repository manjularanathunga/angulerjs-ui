package com.nj.websystem.service;

import com.nj.websystem.model.Patient;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PatientService extends JpaRepository<Patient, Long> {

    List<Patient> findByPatientId(Long id);

    // @Query("From MedicalTest ORDER BY patient_name ASC")
    List<Patient> findAll();


}

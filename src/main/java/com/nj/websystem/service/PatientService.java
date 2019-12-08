package com.nj.websystem.service;

import com.nj.websystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientService extends JpaRepository<Patient, Long> {

    List<Patient> findById(String id);

    @Query("From MedicalTest ORDER BY patientName ASC")
    List<Patient> findAll();

}

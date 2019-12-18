package com.nj.websystem.service;

import com.nj.websystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PatientService extends JpaRepository<Patient, Long> {

    List<Patient> findByPatientId(String patientId);

    @Query("Select c from Patient c where c.patientId like :patientId%")
    List<Patient> findByPatientIdContaining(@Param("patientId") String patientId);

    List<Patient> findByNicNumber(String nicNumber);

    // @Query("From MedicalTest ORDER BY patient_name ASC")
    List<Patient> findAll();

    public List<Patient> getAllByDateCreatedBetween(Date startDate, Date endDate);

    //long countByDateCreatedBetween(Date startDate, Date endDate);

    //long countByAll();
}

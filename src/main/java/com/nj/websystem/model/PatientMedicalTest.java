package com.nj.websystem.model;

import com.nj.websystem.enums.Status;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TBL_PATIENT_MEDICAL_TEST")
public class PatientMedicalTest {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "TBL_PATIENT_MEDICAL_TEST_SEQ", sequenceName = "TBL_PATIENT_MEDICAL_TEST_SEQ", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TBL_PATIENT_MEDICAL_TEST_SEQ")
    private Long id;
    private Long patientId;

    private String actionBy;
    private Date dateCreated;
    private Date lastModified;
    private Status status;

}

package com.nj.websystem.model;

import com.nj.websystem.enums.Status;
import com.nj.websystem.enums.TestType;

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
    private long patientId;
    private TestType type;
    private String mtnumber;
    private String name;
    @Column(precision=2, scale=0)
    private Double price;
    private String actionBy;
    private Date dateCreated;
    private Date lastModified;
    private Status status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getPatientId() {
        return patientId;
    }

    public void setPatientId(long patientId) {
        this.patientId = patientId;
    }

    public TestType getType() {
        return type;
    }

    public void setType(TestType type) {
        this.type = type;
    }

    public String getMtnumber() {
        return mtnumber;
    }

    public void setMtnumber(String mtnumber) {
        this.mtnumber = mtnumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getActionBy() {
        return actionBy;
    }

    public void setActionBy(String actionBy) {
        this.actionBy = actionBy;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

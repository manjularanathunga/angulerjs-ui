package com.nj.websystem.model;

import com.nj.websystem.enums.Status;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TBL_MEDICAL_TEST")
public class MedicalTest {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "TBL_MEDICAL_TEST_SEQ", sequenceName = "TBL_MEDICAL_TEST_SEQ", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TBL_MEDICAL_TEST_SEQ")
    private Long id;
    private Long testTypeId;
    private Long testName;
    @Column(precision=2, scale=0)
    private Double testPrice;
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

    public Long getTestTypeId() {
        return testTypeId;
    }

    public void setTestTypeId(Long testTypeId) {
        this.testTypeId = testTypeId;
    }

    public Long getTestName() {
        return testName;
    }

    public void setTestName(Long testName) {
        this.testName = testName;
    }

    public Double getTestPrice() {
        return testPrice;
    }

    public void setTestPrice(Double testPrice) {
        this.testPrice = testPrice;
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

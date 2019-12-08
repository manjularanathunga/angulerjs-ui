package com.nj.websystem.model;

import com.nj.websystem.enums.Status;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TBL_PATIENT")
public class Patient {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "TBL_PATIENT_SEQ", sequenceName = "TBL_PATIENT_SEQ", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TBL_PATIENT_SEQ")
    private Long id;
    private String patientId;
    @Column(unique=true)
    private String nicNumber;
    private String other;
    private String patientName;
    private String telNumber;
    private Date dateOfBirth;
    private String sex;
    private String seenBy;
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

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getTelNumber() {
        return telNumber;
    }

    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSeenBy() {
        return seenBy;
    }

    public void setSeenBy(String seenBy) {
        this.seenBy = seenBy;
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
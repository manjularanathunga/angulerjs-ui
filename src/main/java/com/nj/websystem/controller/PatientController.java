package com.nj.websystem.controller;

import com.nj.websystem.model.Patient;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.PatientService;
import com.nj.websystem.util.DateUtility;
import com.nj.websystem.util.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/patient")
public class PatientController {

    static Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService services;

    @RequestMapping(value = "/getNextPatientId", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse getNextPatientId() {

        HttpResponse res = new HttpResponse();
        int yearlyRecordCount = services.findAll().size();
        String nextPatientId = StringUtility.getDate(String.format("%05d", (yearlyRecordCount + 1)));
        logger.info("Patient - NextPatientId : {} " + nextPatientId);
        res.setResponse(nextPatientId);
        res.setSuccess(true);
        res.setRecCount(1);
        return res;
    }

    @RequestMapping(value = "/getList", method = RequestMethod.GET, headers = "Accept=application/json")
    public List getList() {
        List list = services.findAll();
        logger.info("Count of UserAdmin : {} " + list.size());
        return list;
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse getById(@RequestParam(value = "id", required = false) long id) {
        logger.info("Request Patient getById : {} " + id);
        HttpResponse res = new HttpResponse();
        Optional<Patient> patientList = services.findById(id);
        if (patientList != null) {
            res.setResponse(patientList.get());
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid Patient !");
        }
        return res;
    }

    @RequestMapping(value = "/findByPatientId", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findByPatientId(@RequestParam(value = "patientId", required = true) String patientId) {
        logger.info("Request Patient findByPatientId : {} " + patientId);
        HttpResponse res = new HttpResponse();
        List<Patient> patientList = services.findByPatientId(patientId);
        if (patientList != null && !patientList.isEmpty()) {
            res.setResponse(patientList.get(0));
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid Patient !");
        }
        return res;
    }

    @RequestMapping(value = "/findByPatientListById", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findByPatientListById(@RequestParam(value = "patientId", required = false) String patientId) {
        logger.info("Request Patient findByPatientListById : {} " + patientId);
        HttpResponse res = new HttpResponse();
        List<Patient> patientList = services.findByPatientIdContaining(patientId);
        if (patientList != null && !patientList.isEmpty()) {
            res.setResponse(patientList);
            res.setSuccess(true);
            res.setRecCount(patientList.size());
        } else {
            res.setSuccess(false);
            res.setException("Invalid Patient ID !");
        }
        return res;
    }

    @RequestMapping(value = "/findByNicNumber", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findByNicNumber(@RequestParam(value = "id", required = false) String nicNumber) {
        logger.info("Request Patient findByNicNumber : {} " + nicNumber);
        HttpResponse res = new HttpResponse();
        List<Patient> patientList = services.findByNicNumber(nicNumber);
        if (patientList != null && !patientList.isEmpty()) {
            res.setResponse(patientList.get(0));
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid Patient !");
        }
        return res;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST, headers = "Accept=application/json")
    public Patient save(@RequestBody Patient obj) {
        logger.info("save Patient Name : {} " + obj.getNicNumber());
        return services.save(obj);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public HttpResponse delete(@RequestParam(value = "id", required = false) Long id) {
        logger.info("Delete Patient id : {} " + id);
        HttpResponse response = new HttpResponse();
        Patient item = services.getOne(id);
        if (item != null) {
            services.delete(item);
            response.setSuccess(true);
        } else {
            response.setSuccess(false);
            logger.info("Record has been already deleted : {} " + id);
            response.setException("Record has been already deleted");
        }
        return response;
    }
}

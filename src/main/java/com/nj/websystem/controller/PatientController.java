package com.nj.websystem.controller;

import com.nj.websystem.model.Patient;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/patient")
public class PatientController {

    static Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService services;

    @RequestMapping(value = "/getList", method = RequestMethod.GET, headers = "Accept=application/json")
    public List getList() {
        List list = services.findAll();
        logger.info("Count of UserAdmin : {} " + list.size());
        return list;
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse getById(@RequestParam(value = "id", required = false) long id) {
        logger.info("Request UserAdmin Id : {} " + id);
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
    public HttpResponse findByPatientId(@RequestParam(value = "id", required = false) String patientId) {
        logger.info("Request UserAdmin Id : {} " + patientId);
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

    @RequestMapping(value = "/findByNicNumber", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findByNicNumber(@RequestParam(value = "id", required = false) String nicNumber) {
        logger.info("Request UserAdmin Id : {} " + nicNumber);
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
        logger.info("UserAdmin Name : {} " + obj.getNicNumber());
        return services.save(obj);
    }

/*    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public HttpResponse delete(@RequestParam(value = "id", required = false) Long id) {
        logger.info("Delete UserAdmin Name : {} " + id);
        HttpResponse response = new HttpResponse();
        UserAdmin item = services.getOne(id);
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

    @RequestMapping(value = "/bulkInsert", method = RequestMethod.POST, headers = "Accept=application/json")
    public List<UserAdmin> bulkInsert(@RequestBody List<UserAdmin> items) {
        logger.info("UserAdmin countt : {} " + items.size());
        items.forEach(item -> {
            item.setId(null);
            item.setDateCreated(new Date());
        });
        return services.saveAll(items);
    }*/

}

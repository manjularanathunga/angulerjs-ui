package com.nj.websystem.controller;

import com.nj.websystem.model.MedicalTest;
import com.nj.websystem.model.Patient;
import com.nj.websystem.model.PatientMedicalTest;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.MedicalTestService;
import com.nj.websystem.service.PatientMedicalTestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/patientmedicaltest")
public class PetientMedicalTestController {

    static Logger logger = LoggerFactory.getLogger(PetientMedicalTestController.class);

    @Autowired
    private PatientMedicalTestService services;

    @RequestMapping(value = "/getList", method = RequestMethod.GET, headers = "Accept=application/json")
    public List getList() {
        List list = services.findAll();
        logger.info("Count of UserAdmin : " + list.size());
        return list;
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse getById(@RequestParam(value = "id", required = false) long id) {
        logger.info("Request MedicalTest Id : {} " + id);
        HttpResponse res = new HttpResponse();
        List<PatientMedicalTest> patientList = services.findAll();
        if (patientList != null && !patientList.isEmpty()) {
            res.setResponse(patientList.get(0));
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid MedicalTest !");
        }
        return res;
    }

    @RequestMapping(value = "/findAllByPatientIdAndType", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findAllByPatientIdAndType(@RequestParam(value = "patientId", required = false) String patientId,@RequestParam(value = "type", required = false) String type) {
        logger.info("Request UserAdmin Id : {} " + patientId);
        HttpResponse res = new HttpResponse();
        List<PatientMedicalTest> patientList = services.findAllByPatientIdAndType(patientId,type);
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
    public PatientMedicalTest save(@RequestBody PatientMedicalTest obj) {
        logger.info("TestName : " + obj.getName());
        return services.save(obj);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public HttpResponse delete(@RequestParam(value = "id", required = false)Long id){
        logger.info("Delete OfficeRoom Name : {} " + id);
        HttpResponse response =new HttpResponse();
        PatientMedicalTest item = services.getOne(id);
        if(item != null){
            services.delete(item);
            response.setSuccess(true);
        }else{
            response.setSuccess(false);
            logger.info("Record has been already deleted : {} " + id);
            response.setException("Record has been already deleted");
        }
        return response;
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

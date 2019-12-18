package com.nj.websystem.controller;

import com.nj.websystem.enums.TestType;
import com.nj.websystem.model.PatientMedicalTest;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.PatientMedicalTestService;
import com.nj.websystem.util.DateUtility;
import com.nj.websystem.util.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
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
            res.setResponse(patientList);
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid MedicalTest !");
        }
        return res;
    }

    @RequestMapping(value = "/findAllByPatientIdAndType", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findAllByPatientIdAndType(@RequestParam(value = "patientid", required = false) String patientid, @RequestParam(value = "type", required = false) TestType type) {
        logger.info("Request findAllByPatientIdAndType Id : {patientId, type} " + patientid + " | " + type);
        HttpResponse res = new HttpResponse();
        List<PatientMedicalTest> patientList = services.findAllByPatientIdAndTestType(patientid, type);
        if (patientList != null && !patientList.isEmpty()) {
            res.setResponse(patientList);
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid Patient !");
        }
        return res;
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponse save(@RequestBody PatientMedicalTest obj) {
        HttpResponse res = new HttpResponse();
        logger.info("Saving TestName : " + obj.getName());
        List<PatientMedicalTest> testsList = services.getAllByTestType(obj.getTestType());
        String testNumber = StringUtility.getDate(StringUtility.YY)+obj.getTestType() + String.format("%05d", (testsList.size()+ 1));
        obj.setTestNumber(testNumber);
        PatientMedicalTest savedMedicalTest = services.save(obj);

        if (savedMedicalTest != null) {
            //res.setResponse();
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Fail to save Medical Test : " + obj.getTestNumber());
        }
        return res;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public HttpResponse delete(@RequestParam(value = "id", required = false) Long id) {
        logger.info("Delete OfficeRoom Name : {} " + id);
        HttpResponse response = new HttpResponse();
        PatientMedicalTest item = services.getOne(id);
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
*/
    @RequestMapping(value = "/saveList", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponse bulkInsert(@RequestBody List<PatientMedicalTest> items) {
        logger.info("PatientMedicalTest count : {} " + items.size());
        HttpResponse response = new HttpResponse();
        List result = services.saveAll(items);
        if (result != null && result.size() > 0) {
            response.setSuccess(true);
        } else {
            response.setSuccess(false);
            response.setException("Record not saved");
        }
        return response;

    }

}

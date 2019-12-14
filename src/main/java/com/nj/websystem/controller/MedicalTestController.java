package com.nj.websystem.controller;

import com.nj.websystem.enums.TestType;
import com.nj.websystem.model.MedicalTest;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.MedicalTestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/medicaltest")
public class MedicalTestController {

    static Logger logger = LoggerFactory.getLogger(MedicalTestController.class);

    @Autowired
    private MedicalTestService services;

    @RequestMapping(value = "/getList", method = RequestMethod.GET, headers = "Accept=application/json")
    public List getList() {
        List list = services.findAll();
        logger.info("Count of UserAdmin : " + list.size());
        return list;
    }

    @RequestMapping(value = "/findAllByType", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse findAllByType(@RequestParam(value = "testType", required = false) TestType testType) {
        logger.info("Request MedicalTest type : {} ", testType);
        HttpResponse res = new HttpResponse();
        List<MedicalTest> patientList = services.findAllByTestType(testType);
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

    @RequestMapping(value = "/save", method = RequestMethod.POST, headers = "Accept=application/json")
    public MedicalTest save(@RequestBody MedicalTest obj) {
        logger.info("TestName : " + obj.getName());
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

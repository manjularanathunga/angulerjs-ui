package com.nj.websystem.controller;

import com.nj.websystem.model.ScreenAccess;
import com.nj.websystem.model.UserAdmin;
import com.nj.websystem.rest.AuthRequest;
import com.nj.websystem.rest.HttpResponse;
import com.nj.websystem.service.ScreenAccessService;
import com.nj.websystem.service.UserAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/screen")
public class ScreenAccessController {

    static Logger logger = LoggerFactory.getLogger(ScreenAccessController.class);

    @Autowired
    private ScreenAccessService services;

    @RequestMapping(value = "/getList", method = RequestMethod.GET, headers = "Accept=application/json")
    public List getList() {
        List list = services.findAll();
        logger.info("Count of UserAdmin : {} " + list.size());
        return list;
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET, headers = "Accept=application/json")
    public HttpResponse getById(@RequestParam(value = "id", required = false) String id) {
        logger.info("Request UserAdmin Id : {} " + id);
        HttpResponse res = new HttpResponse();
        ScreenAccess screen = services.getOne(Long.parseLong(id));
        if (screen != null) {
            res.setResponse(screen);
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid User !");
        }
        return res;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST, headers = "Accept=application/json")
    public ScreenAccess save(@RequestBody ScreenAccess obj) {
        logger.info("Save / UserAdmin Name : {} " + obj.getScreenName());
        HttpResponse res = new HttpResponse();
        ScreenAccess result = services.save(obj);
        if (result == null) {
            res.setResponse(result);
            res.setSuccess(true);
            res.setRecCount(1);
        } else {
            res.setSuccess(false);
            res.setException("Invalid User !");
        }
        return services.save(obj);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public HttpResponse delete(@RequestParam(value = "id", required = false) Long id) {
        logger.info("Delete UserAdmin Name : {} " + id);
        HttpResponse response = new HttpResponse();
        ScreenAccess item = services.getOne(id);
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
    public List<ScreenAccess> bulkInsert(@RequestBody List<ScreenAccess> items) {
        logger.info("UserAdmin countt : {} " + items.size());
        return services.saveAll(items);
    }

}

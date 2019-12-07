package com.nj.websystem.rest;

public class HttpResponse {

    private String responce;
    private boolean success;
    private String exception;
    private int recCount;
    private Object resObjects;

    public String getResponce() {
        return responce;
    }

    public void setResponce(String responce) {
        this.responce = responce;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public int getRecCount() {
        return recCount;
    }

    public void setRecCount(int recCount) {
        this.recCount = recCount;
    }

    public Object getResObjects() {
        return resObjects;
    }

    public void setResObjects(Object resObjects) {
        this.resObjects = resObjects;
    }
}

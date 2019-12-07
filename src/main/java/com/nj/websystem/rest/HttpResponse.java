package com.nj.websystem.rest;

public class HttpResponse {

    private Object responce;
    private boolean success;
    private String exception;
    private int recCount;

    public Object getResponce() {
        return responce;
    }

    public void setResponce(Object responce) {
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
}

package com.nj.websystem.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtility {

    private static Date currentDate =new Date();

    public static Date getTomorrowDate() {
        Date utilDate = new Date();
        int tomorrow = currentDate.getDate()+1;
        utilDate.setDate(tomorrow);
        return utilDate;
    }

    public static Date getYearEnd() {
        Date utilDate = new Date();
        utilDate.setYear(currentDate.getYear());
        utilDate.setMonth(12);
        utilDate.setDate(31);
        utilDate.setHours(23);
        utilDate.setMinutes(59);
        utilDate.setSeconds(59);
        return currentDate;
    }

    public static Date getFistDayOfYear() {
        Date utilDate = new Date();
        utilDate.setYear(currentDate.getYear());
        utilDate.setMonth(1);
        utilDate.setDate(1);
        utilDate.setHours(0);
        utilDate.setMinutes(1);
        utilDate.setSeconds(1);
        return currentDate;
    }

    public static Date getCuttentYear() {
        Date utilDate = new Date();
        utilDate.setYear(currentDate.getYear());
        utilDate.setMonth(1);
        utilDate.setDate(1);
        utilDate.setHours(0);
        utilDate.setMinutes(1);
        utilDate.setSeconds(1);
        return currentDate;
    }
}

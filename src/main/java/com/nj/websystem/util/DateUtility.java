package com.nj.websystem.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtility {

    private static Date currentDate;

    public static Date getTomorrowDate() {
        currentDate = new Date();
        int tomorrow = currentDate.getDate()+1;
        currentDate.setDate(tomorrow);
        return currentDate;
    }
}

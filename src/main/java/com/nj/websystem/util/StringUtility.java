package com.nj.websystem.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtility {

    final static public String YY = "yy";
    private static SimpleDateFormat simpleDateFormat = null;

    public static String getDate(String pattern) {
        simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(new Date());
    }
}

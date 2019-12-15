package com.nj.websystem.model;

import javax.persistence.*;

@Entity
@Table(name = "TBL_SCREEN_ACCESS")
public class ScreenAccess {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "TBL_SCREEN_ACCESS_SEQ", sequenceName = "TBL_SCREEN_ACCESS_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TBL_SCREEN_ACCESS_SEQ")
    private Long id;
    private String ScreenName;
    private String prop;
    private boolean readEnabled;
    private boolean writeEnabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScreenName() {
        return ScreenName;
    }

    public void setScreenName(String screenName) {
        ScreenName = screenName;
    }

    public String getProp() {
        return prop;
    }

    public void setProp(String prop) {
        this.prop = prop;
    }

    public boolean isReadEnabled() {
        return readEnabled;
    }

    public void setReadEnabled(boolean readEnabled) {
        this.readEnabled = readEnabled;
    }

    public boolean isWriteEnabled() {
        return writeEnabled;
    }

    public void setWriteEnabled(boolean writeEnabled) {
        this.writeEnabled = writeEnabled;
    }
}

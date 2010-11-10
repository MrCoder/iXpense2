package com.ixpense.domain;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;
import com.ixpense.PMF;

import javax.jdo.PersistenceManagerFactory;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import java.util.Date;

@PersistenceCapable
public class Event {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

    @Persistent
    private String title;

    @Persistent
    private String description;

    @Persistent
    private Date time;

    @Persistent
    private String location;

    @Persistent
    private User creator;


    public Event(String title, String description, Date time, String location, User creator) {

        this.title = title;
        this.description = description;
        this.time = time;
        this.location = location;
        this.creator = creator;
    }

    public String getTitle() {
        return title;
    }
}

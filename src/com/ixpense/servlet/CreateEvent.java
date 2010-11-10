package com.ixpense.servlet;

import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.oauth.OAuthService;
import com.google.appengine.api.oauth.OAuthServiceFactory;
import com.google.appengine.api.users.User;
import com.ixpense.PMF;
import com.ixpense.domain.Event;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

public class CreateEvent extends HttpServlet{

    public void doPost(HttpServletRequest req, HttpServletResponse resp){


        String title = req.getParameter("title");

        String description = "description";
        Date time = new Date();
        String location = "location";
        User creator = null;
        try {
            OAuthService oauth = OAuthServiceFactory.getOAuthService();
            creator = oauth.getCurrentUser();

        } catch (OAuthRequestException e) {
            // The consumer made an invalid OAuth request, used an access token that was
            // revoked, or did not provide OAuth information.
            // ...
        }

        Event newEvent = new Event(title, description, time, location, creator);
        PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
        persistenceManager.makePersistent(newEvent);

        persistenceManager.close();

    }

}

package com.ixpense.servlet;


import com.google.gdata.client.calendar.CalendarService;
import com.google.gdata.data.calendar.CalendarEntry;
import com.google.gdata.data.calendar.CalendarFeed;
import com.google.gdata.util.AuthenticationException;
import com.google.gdata.util.ServiceException;
import com.ixpense.PMF;
import com.ixpense.domain.Event;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.List;

public class EventsPage extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PersistenceManager persistenceManager = PMF.get().getPersistenceManager();

        Query query = persistenceManager.newQuery(Event.class);
        List<Event> events = (List<Event>) query.execute();

        


        resp.setContentType("text/plain");
        for (Event event : events) {

            resp.getWriter().println(event.getTitle());
        }
    }
}

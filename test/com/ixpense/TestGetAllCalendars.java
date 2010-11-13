package com.ixpense;

import com.google.gdata.client.Query;
import com.google.gdata.client.calendar.CalendarQuery;
import com.google.gdata.client.calendar.CalendarService;
import com.google.gdata.data.DateTime;
import com.google.gdata.data.Feed;
import com.google.gdata.data.TextContent;
import com.google.gdata.data.calendar.CalendarEntry;
import com.google.gdata.data.calendar.CalendarEventEntry;
import com.google.gdata.data.calendar.CalendarEventFeed;
import com.google.gdata.data.calendar.CalendarFeed;
import com.google.gdata.util.AuthenticationException;
import com.google.gdata.util.ServiceException;
import org.junit.Test;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

public class TestGetAllCalendars {
    @Test
    public void should_get_all_calendars() {

        CalendarService myService = new CalendarService("exampleCo-exampleApp-1");

        try {
            myService.setUserCredentials("braveostrich@gmail.com", "iscxp1127");

            // Send the request and print the response
            URL feedUrl = new URL("https://www.google.com/calendar/feeds/default/allcalendars/full");
            CalendarFeed resultFeed = myService.getFeed(feedUrl, CalendarFeed.class);
            System.out.println("Your calendars:");
            System.out.println();
            for (int i = 0; i < resultFeed.getEntries().size(); i++) {
                CalendarEntry entry = resultFeed.getEntries().get(i);
                System.out.println("\t" + entry.getTitle().getPlainText());
            }
        } catch (AuthenticationException e) {
            e.printStackTrace();
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void should_insert_extend_prop_and_get_it_back() {


        try {
            URL feedUrl = new URL("https://www.google.com/calendar/feeds/default/private/full");

            CalendarService myService = new CalendarService("exampleCo-exampleApp-1");
            myService.setUserCredentials("braveostrich@gmail.com", "iscxp1127");
            Query myQuery = new Query(feedUrl);
            myQuery.setFullTextQuery("Tennis");
            CalendarEventFeed myResultsFeed = myService.query(myQuery,
                    CalendarEventFeed.class);
            List<CalendarEventEntry> entries = myResultsFeed.getEntries();
            int i = 0;
            for (CalendarEventEntry entry : entries) {

                String content = ((TextContent)(entry.getContent())).getContent().getPlainText();
                System.out.println(i++ + ":" +content);
            }

        } catch (AuthenticationException e) {
            e.printStackTrace();
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

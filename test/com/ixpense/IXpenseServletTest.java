package com.ixpense;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class IXpenseServletTest {

    @Mock
    HttpServletRequest httpServletRequest;

    @Mock
    HttpServletResponse httpServletResponse;

    @Mock
    PrintWriter printWriter;

    @Before
    public void setUp() {
        initMocks(this);
    }

    @Test
    public void should_call_response_getWriter() throws IOException {
        IXpenseServlet iXpenseServlet = new IXpenseServlet();

        when(httpServletResponse.getWriter()).thenReturn(printWriter);

        iXpenseServlet.doGet(httpServletRequest, httpServletResponse);

        verify(httpServletResponse).setContentType("text/plain");

    }

    @Test
    public void integration_test_to_get_data_from_your_expense() throws IOException {
        URL url = new URL("http://www.example.com/comment");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        
//        connection.setRequestProperty("Authorization",
//                "Basic " + codec.encodeBase64String(("username:password").getBytes());
    }
}

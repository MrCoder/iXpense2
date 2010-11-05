package com.ixpense;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;

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
        URL url = YourExpenseService.getYourExpenseUrl();
        String encodedUserAndPassword = YourExpenseService.getEncodedUserAndPassword();
        URLConnection urlConnection = YourExpenseService.getUrlConnection(url, encodedUserAndPassword);

        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        InputStream content = urlConnection.getInputStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(content));

        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line);
            pw.println(line);
        }
    }

}

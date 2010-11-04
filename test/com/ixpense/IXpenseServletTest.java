package com.ixpense;

import org.apache.commons.codec.binary.Base64;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.UsernamePasswordCredentials;
import org.apache.commons.httpclient.auth.AuthScope;
import org.apache.commons.httpclient.methods.GetMethod;

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
        URL url = new URL("http://your-expense.appspot.com/expenses");
        String userPassword = "test1" + ":" + "test1";
        String encoding = new sun.misc.BASE64Encoder().encode(userPassword.getBytes());
        URLConnection uc = url.openConnection();
        uc.setRequestProperty("Authorization", "Basic " + encoding);
        StringWriter sw = new StringWriter();

        PrintWriter pw = new PrintWriter(sw);
        InputStream content = (InputStream) uc.getInputStream();
        BufferedReader in =
                new BufferedReader(new InputStreamReader(content));
        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line);
            pw.println(line);
        }
    }
}

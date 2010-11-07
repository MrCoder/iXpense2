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


}

package com.ixpense;

import java.io.*;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.*;

public class IXpenseServlet extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("audio/mpeg");

        FileInputStream fis = new FileInputStream("./audio/translate_tts.mp3");
        byte[] b = new byte[512];
        int len;
        while ((len = fis.read(b)) > -1) {
            resp.getOutputStream().write(b, 0, len);
        }
        resp.getOutputStream().flush();
        resp.getOutputStream().close();
    }


}

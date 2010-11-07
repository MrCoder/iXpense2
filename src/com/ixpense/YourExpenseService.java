package com.ixpense;

import org.apache.commons.codec.binary.Base64;

import java.io.*;
import java.net.*;

public class YourExpenseService {

    public String getExpenseList() throws IOException {
        URL yourExpenseUrl = getYourExpenseUrl();
        String userAndPassword = getEncodedUserAndPassword();
        URLConnection yourExpenseUrlConnection = getUrlConnection(yourExpenseUrl, userAndPassword);

        StringWriter sw = getResponse(yourExpenseUrlConnection);
        return sw.toString();
    }

    private StringWriter getResponse(URLConnection yourExpenseUrlConnection) throws IOException {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        InputStream content = yourExpenseUrlConnection.getInputStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(content));
        in.read();

        String line;
        while ((line = in.readLine()) != null) {
            pw.println(line);
        }
        return sw;
    }

    private String getEncodedUserAndPassword() {
        String userPassword = "test" + ":" + "test";
        return Base64.encodeBase64URLSafeString(userPassword.getBytes());
    }

    private HttpURLConnection getUrlConnection(URL url, String encodedUserAndPassword) throws IOException {
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("Authorization", "Basic " + encodedUserAndPassword);
        return urlConnection;
    }

    private URL getYourExpenseUrl() throws MalformedURLException {
        return new URL("http://192.168.1.21:8000/expense/");
    }

    public String addExpense() throws IOException {

        String data = URLEncoder.encode("amount", "UTF-8") + "=" + URLEncoder.encode("123", "UTF-8");
        data += "&" + URLEncoder.encode("category", "UTF-8") + "=" + URLEncoder.encode("test123test", "UTF-8");
        data += "&" + URLEncoder.encode("comment", "UTF-8") + "=" + URLEncoder.encode("from ixpense", "UTF-8");

        data = "amount=124&category=124test&comment=unknown";

        URL url = new URL("http://192.168.1.21:8000/expense/");
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();


        String userPassword = "test" + ":" + "test";
        urlConnection.setRequestProperty("Authorization", "Basic " + Base64.encodeBase64URLSafeString(userPassword.getBytes()));

        HttpURLConnection yourExpenseUrlConnection = urlConnection;

        yourExpenseUrlConnection.setRequestMethod("POST");
        yourExpenseUrlConnection.setRequestProperty("Content-Type",
                "application/x-www-form-urlencoded");
        yourExpenseUrlConnection.setDoOutput(true);

        OutputStreamWriter outputStream = new OutputStreamWriter(yourExpenseUrlConnection.getOutputStream());
        outputStream.write(data);
        outputStream.flush();

        StringWriter sw = getResponse(yourExpenseUrlConnection);


        return sw.toString();
    }
}

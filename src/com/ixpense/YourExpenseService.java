package com.ixpense;

import com.ixpense.domain.Expense;
import org.apache.commons.codec.binary.Base64;

import java.io.*;
import java.net.*;

public class YourExpenseService {

    public String getExpenseList() throws IOException {
        URL yourExpenseUrl = new URL("http://your-expense.appspot.com/expenses/");
        String userPassword = "test" + ":" + "test";
        String userAndPassword = Base64.encodeBase64URLSafeString(userPassword.getBytes());
        HttpURLConnection urlConnection = (HttpURLConnection) yourExpenseUrl.openConnection();
        urlConnection.setRequestProperty("Authorization", "Basic " + userAndPassword);

        StringWriter sw = getResponse(urlConnection);
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

    private String encodeParamAndValue(String paramName, String paramValue) throws UnsupportedEncodingException {
        return URLEncoder.encode(paramName, "UTF-8") + "=" + URLEncoder.encode(paramValue, "UTF-8");
    }

    public void addExpense(Expense expense) throws IOException {

        String data = encodeParamAndValue("amount", String.valueOf(expense.getAmount()));
        data += "&" + encodeParamAndValue("category", expense.getCategory());
        data += "&" + encodeParamAndValue("comment", expense.getComment());


        URL url = new URL("http://your-expense.appspot.com/expense/");
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();


        String userPassword = "test" + ":" + "test";
        urlConnection.setRequestProperty("Authorization", "Basic " + Base64.encodeBase64URLSafeString(userPassword.getBytes()));

        urlConnection.setRequestMethod("POST");
        urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        urlConnection.setDoOutput(true);

        OutputStreamWriter outputStream = new OutputStreamWriter(urlConnection.getOutputStream());
        outputStream.write(data);
        outputStream.flush();

        StringWriter sw = getResponse(urlConnection);

        sw.toString();

    }
}

package com.ixpense;

import org.apache.commons.codec.binary.Base64;
import org.junit.Test;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import static org.hamcrest.core.IsNot.not;
import static org.hamcrest.core.IsNull.nullValue;
import static org.junit.Assert.assertThat;

public class YourExpenseServiceTest {
    @Test
    public void should_return_expense_list() throws IOException {
        YourExpenseService yourExpenseService = new YourExpenseService();
        String expense = yourExpenseService.getExpenseList();
        System.out.println(expense);
        assertThat(expense, not(nullValue()));
    }

    @Test
    public void should_return_a_id_after_added_an_expense() throws IOException {
        YourExpenseService yourExpenseService = new YourExpenseService();
        String id = yourExpenseService.addExpense();
        System.out.println(id);
        assertThat(id, not(nullValue()));
    }

    @Test
    public void test_excute_Post() throws UnsupportedEncodingException {

        URL url;
        HttpURLConnection connection = null;
        try {
            url = new URL("http://192.168.1.21:8000/expense/");
            connection = (HttpURLConnection) url.openConnection();

            String userPassword = "test" + ":" + "test";
            connection.setRequestProperty("Authorization", "Basic " + Base64.encodeBase64URLSafeString(userPassword.getBytes()));

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            String data = encodeParamAndValue("amount", "876");
            data += "&" + URLEncoder.encode("category", "UTF-8") + "=" + URLEncoder.encode("iXpensetest", "UTF-8");
            data += "&" + URLEncoder.encode("comment", "UTF-8") + "=" + URLEncoder.encode("test", "UTF-8");

            connection.setRequestProperty("Content-Length", "" + Integer.toString(data.getBytes().length));
            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoOutput(true);
            connection.connect();

            //Send request
            OutputStreamWriter outputStream = new OutputStreamWriter(connection.getOutputStream());
            outputStream.write(data);
            outputStream.flush();
            outputStream.close();

            //Get Response
            InputStream inputStream = connection.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            StringBuffer response = new StringBuffer();
            while ((line = bufferedReader.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            bufferedReader.close();
            System.out.println(response.toString());

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private String encodeParamAndValue(String paramName, String paramValue) throws UnsupportedEncodingException {
        return URLEncoder.encode(paramName, "UTF-8") + "=" + URLEncoder.encode(paramValue, "UTF-8");
    }

    @Test
    public void test_post() {


    }

}

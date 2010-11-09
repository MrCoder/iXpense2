package com.ixpense;

import com.google.appengine.api.xmpp.JID;
import com.google.appengine.api.xmpp.Message;
import com.google.appengine.api.xmpp.MessageBuilder;
import com.google.appengine.api.xmpp.MessageType;
import com.google.appengine.api.xmpp.XMPPService;
import com.google.appengine.api.xmpp.XMPPServiceFactory;
import com.ixpense.domain.Expense;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Handler class for all XMPP activity.
 */
public class IXpenseReceiverServlet extends HttpServlet {

    private static final XMPPService xmppService =
            XMPPServiceFactory.getXMPPService();

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        Message message = xmppService.parseMessage(request);

        String messageBody = message.getBody();
        if (messageBody.startsWith("/mylist")) {

            YourExpenseService yourExpenseService = new YourExpenseService();

            replyToMessage(message, "We are fetching your expense list...");

            replyToMessage(message, yourExpenseService.getExpenseList());
        } else if (messageBody.startsWith("/submit")) {
            int prefixLen = "/submit".length();
            int messageBodyLen = messageBody.length();
            Expense expense = getExpenseFromMessage(messageBody.substring(prefixLen, messageBodyLen));
            YourExpenseService yourExpenseService = new YourExpenseService();
            yourExpenseService.addExpense(expense);
            replyToMessage(message, "Your expense submitted:"
                    + String.valueOf(expense.getAmount())
                    + ","
                    + expense.getCategory()
                    + ","
                    + expense.getComment());
        } else {
            replyToMessage(message, "Get list by: /mylist \n" +
                    "Submit new expense by: /submit amount, category, comment");
        }

    }

    private Expense getExpenseFromMessage(String message) {
        String[] strings = message.split(",");
        double amount = 0;
        String category = "Default Category";
        String comment = "No comment";

        if (strings.length > 0) amount = Double.parseDouble(strings[0]);
        if (strings.length > 1) category = strings[1].trim();
        if (strings.length > 2) comment = strings[2].trim();

        return new Expense(amount, category, comment);
    }


    private void replyToMessage(Message message, String body) {
        Message reply = new MessageBuilder()
                .withRecipientJids(message.getFromJid())
                .withMessageType(MessageType.NORMAL)
                .withBody(body)
                .build();

        xmppService.sendMessage(reply);
    }
}
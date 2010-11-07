package com.ixpense;

import com.google.appengine.api.xmpp.JID;
import com.google.appengine.api.xmpp.Message;
import com.google.appengine.api.xmpp.MessageBuilder;
import com.google.appengine.api.xmpp.MessageType;
import com.google.appengine.api.xmpp.XMPPService;
import com.google.appengine.api.xmpp.XMPPServiceFactory;

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

        YourExpenseService yourExpenseService = new YourExpenseService();

        replyToMessage(message, "We are fetching your expense list...");

        replyToMessage(message, yourExpenseService.getExpenseList());
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
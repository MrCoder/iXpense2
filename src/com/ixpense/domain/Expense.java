package com.ixpense.domain;

public class Expense {
    private double amount;
    private String category;
    private String comment;

    public Expense(double amount, String category, String comment) {
        this.amount = amount;
        this.category = category;
        this.comment = comment;
    }


    public double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public String getComment() {
        return comment;
    }
}

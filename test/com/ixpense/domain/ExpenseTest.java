package com.ixpense.domain;

import org.junit.Test;

public class ExpenseTest {
    @Test
    public void should_accept_amount_category_comment_as_constructor_params(){
        new Expense(100.0, "Category Testing", "Comment Testing");   
    }
}

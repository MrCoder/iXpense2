package com.ixpense;

import com.ixpense.domain.Expense;
import org.junit.Test;

import java.io.*;

import static org.hamcrest.core.IsNot.not;
import static org.hamcrest.core.IsNull.nullValue;
import static org.junit.Assert.assertThat;

public class YourExpenseServiceTest {
    @Test
    public void should_return_expense_list()  {
        YourExpenseService yourExpenseService = new YourExpenseService();
        String expense = null;
        try {
            expense = yourExpenseService.getExpenseList();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(expense);
        assertThat(expense, not(nullValue()));
    }


    @Test
    public void should_add_an_expense()  {
        Expense expense = new Expense(200.0, "Unit test", "From iXpense");
        YourExpenseService yourExpenseService = new YourExpenseService();
        try {
            yourExpenseService.addExpense(expense);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const userId = sessionStorage.getItem("userId");
  const [income, setIncome] = useState("0");
  const [expense, setExpense] = useState("0");
  const [balance, setBalance] = useState("0");

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categoryReport, setCategoryReport] = useState([]);

  const [highestCategory, setHighestCategory] = useState("-");
  const [transactionCount, setTransactionCount] = useState(0);
  const [expenseRatio, setExpenseRatio] = useState(0);

  useEffect(() => {
    fetchSummary();
    fetchRecentTransactions();
    fetchCategoryReport();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get(
        `/dashboard?action=summary&userId=${userId}`
      );

      const data = response.data.split("\n");

      setIncome(data[0]?.split(":")[1]?.trim());
      setExpense(data[1]?.split(":")[1]?.trim());
      setBalance(data[2]?.split(":")[1]?.trim());

      const incomeValue = Number(data[0]?.split(":")[1]?.trim());
      const expenseValue = Number(data[1]?.split(":")[1]?.trim());

      if (incomeValue > 0) {
        setExpenseRatio(((expenseValue / incomeValue) * 100).toFixed(1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await api.get(
        `/dashboard?action=recent&userId=${userId}`
      );

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setRecentTransactions(rows);
      setTransactionCount(rows.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoryReport = async () => {
    try {
      const response = await api.get(
        `/dashboard?action=categoryReport&userId=${userId}`
      );
      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setCategoryReport(rows);

      let maxAmount = 0;
      let maxCategory = "-";

      rows.forEach((item) => {
        const parts = item.split(":");

        if (parts.length === 2) {
          const amount = Number(parts[1].trim());

          if (amount > maxAmount) {
            maxAmount = amount;
            maxCategory = parts[0].trim();
          }
        }
      });

      setHighestCategory(maxCategory);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-header">
      <h1>Dashboard</h1>

      <p>Track your finances and monitor your spending.</p>

      {/* Summary Cards */}

      <div className="dashboard-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <h2>₹ {income}</h2>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <h2>₹ {expense}</h2>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <h2>₹ {balance}</h2>
        </div>
      </div>

      {/* Expense Analytics */}

      <div className="section">
        <h2>Expense Analytics</h2>

        {categoryReport.length > 0 && (
          <ExpenseChart categoryReport={categoryReport} />
        )}

        {categoryReport.length === 0 ? (
          <p>No Expense Data</p>
        ) : (
          categoryReport.map((item, index) => (
            <div key={index} className="transaction-row">
              {item}
            </div>
          ))
        )}
      </div>

      {/* Financial Insights */}

      <div className="section">
        <h2>Financial Insights</h2>

        <div className="insight-grid">
          <div className="insight-card">
            <h4>Top Category</h4>
            <h3>{highestCategory}</h3>
          </div>

          <div className="insight-card">
            <h4>Transactions</h4>
            <h3>{transactionCount}</h3>
          </div>

          <div className="insight-card">
            <h4>Expense Ratio</h4>
            <h3>{expenseRatio}%</h3>
          </div>

          <div className="insight-card">
            <h4>Savings</h4>
            <h3>₹ {balance}</h3>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="section recent-section">
        <h2>Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p>No Recent Transactions</p>
        ) : (
          recentTransactions.map((transaction, index) => (
            <div key={index} className="transaction-row">
              {transaction}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

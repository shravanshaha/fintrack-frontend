import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [income, setIncome] = useState("0");
  const [expense, setExpense] = useState("0");
  const [balance, setBalance] = useState("0");

  const [recentTransactions, setRecentTransactions] = useState([]);

  const [categoryReport, setCategoryReport] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchRecentTransactions();
    fetchCategoryReport();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/dashboard?action=summary");

      const data = response.data.split("\n");

      setIncome(data[0]?.split(":")[1]?.trim());

      setExpense(data[1]?.split(":")[1]?.trim());

      setBalance(data[2]?.split(":")[1]?.trim());
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await api.get("/dashboard?action=recent");

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setRecentTransactions(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoryReport = async () => {
    try {
      const response = await api.get("/dashboard?action=categoryReport");

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setCategoryReport(rows);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-header">
      <h1>Dashboard</h1>

      <p>Track your finances and monitor your spending.</p>

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

      <div className="section">
        <h2>Expense By Category</h2>

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
    </div>
  );
}

export default Dashboard;

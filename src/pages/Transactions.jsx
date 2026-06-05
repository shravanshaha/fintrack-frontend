import { useEffect, useState } from "react";
import api from "../services/api";

function Transactions() {
  const userId = sessionStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [keyword, setKeyword] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(
        `/transaction?action=list&userId=${userId}`
      );

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setTransactions(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/category?action=list&userId=${userId}`);

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setCategories(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const addTransaction = async () => {
    try {
      const response = await api.get(
        `/transaction?action=create&userId=${userId}&categoryId=${categoryId}&amount=${amount}&type=${type}&note=${note}&date=${date}`
      );

      setMessage(response.data);

      setCategoryId("");
      setAmount("");
      setNote("");
      setDate("");

      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await api.get(
        `/transaction?action=delete&id=${id}&userId=${userId}`
      );

      setMessage(response.data);

      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const searchTransactions = async () => {
    try {
      const response = await api.get(
        `/transaction?action=search&keyword=${keyword}&userId=${userId}`
      );

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setTransactions(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const filterByDate = async () => {
    try {
      const response = await api.get(
        `/transaction?action=daterange&start=${startDate}&end=${endDate}&userId=${userId}`
      );

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setTransactions(rows);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1>Transactions</h1>

      <div className="section">
        <h2>Add Transaction</h2>

        <div className="transaction-form">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((category, index) => {
              const parts = category.split("|");

              const id = parts[0]?.trim();

              const name = parts[1]?.trim();

              return (
                <option key={index} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">EXPENSE</option>

            <option value="INCOME">INCOME</option>
          </select>

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addTransaction}>Add</button>
        </div>

        <p className="message">{message}</p>
      </div>

      <div className="section">
        <h2>Search & Filter</h2>

        <div className="filter-row">
          <input
            type="text"
            placeholder="Search Note"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={searchTransactions}>Search</button>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={filterByDate}>Filter</button>

          <button onClick={fetchTransactions}>Show All</button>
        </div>
      </div>

      <div className="section">
        <h2>Transaction List</h2>

        {transactions.map((transaction, index) => {
          const parts = transaction.split("|");

          const id = parts[0]?.trim();

          return (
            <div key={index} className="list-item">
              <span>{transaction}</span>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transactions;

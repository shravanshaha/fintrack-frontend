import { useEffect, useState } from "react";
import api from "../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category?action=list");

      const rows = response.data.split("\n").filter((row) => row.trim() !== "");

      setCategories(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = async () => {
    try {
      const response = await api.get(
        `/category?action=create&name=${name}&type=${type}`
      );

      setMessage(response.data);

      setName("");

      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await api.get(`/category?action=delete&id=${id}`);

      setMessage(response.data);

      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1>Categories</h1>

      <div className="section">
        <h2>Add Category</h2>

        <div className="form-row">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">EXPENSE</option>

            <option value="INCOME">INCOME</option>
          </select>

          <button onClick={addCategory}>Add Category</button>
        </div>

        <p className="message">{message}</p>
      </div>

      <div className="section">
        <h2>Category List</h2>

        {categories.map((category, index) => {
          const parts = category.split("|");

          const id = parts[0]?.trim();

          const name = parts[1]?.trim();

          const categoryType = parts[2]?.trim();

          return (
            <div key={index} className="list-item">
              <div>
                <strong>{name}</strong>

                <br />

                <span
                  className={
                    categoryType === "INCOME" ? "income-badge" : "expense-badge"
                  }
                >
                  {categoryType}
                </span>
              </div>

              <button className="delete-btn" onClick={() => deleteCategory(id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;

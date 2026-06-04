import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ categoryReport = [] }) {
  const labels = [];
  const values = [];

  categoryReport.forEach((item) => {
    if (!item) return;

    const parts = item.split(":");

    if (parts.length >= 2) {
      labels.push(parts[0].trim());

      values.push(Number(parts[1].trim()));
    }
  });

  if (labels.length === 0) {
    return <p>No Chart Data</p>;
  }

  const data = {
    labels,

    datasets: [
      {
        label: "Expenses",

        data: values,

        backgroundColor: [
          "#2563eb", // Blue
          "#16a34a", // Green
          "#0ea5e9", // Sky
          "#64748b", // Slate
          "#8b5cf6", // Purple
          "#f59e0b", // Amber
        ],

        borderColor: "#ffffff",

        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div
      style={{
        width: "420px",
        height: "420px",
        margin: "20px auto",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}

export default ExpenseChart;

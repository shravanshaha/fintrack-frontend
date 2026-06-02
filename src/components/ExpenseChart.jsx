import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ report }) {
  const labels = [];
  const values = [];

  report.forEach((item) => {
    const parts = item.split("|");

    if (parts.length >= 2) {
      labels.push(parts[0].trim());

      values.push(Number(parts[1].trim()));
    }
  });

  const data = {
    labels,

    datasets: [
      {
        data: values,
      },
    ],
  };

  return <Pie data={data} />;
}

export default ExpenseChart;

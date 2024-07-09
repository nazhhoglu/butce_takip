import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryCharts = ({ email }) => {
  const [incomeCategories, setIncomeCategories] = useState({});
  const [expenseCategories, setExpenseCategories] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1"
        );
        const data = await response.json();

        const userExpenses = data.data.filter((item) => item.email === email);

        let income = {};
        let expense = {};

        userExpenses.forEach((item) => {
          const amount = parseFloat(item.amount);
          const category = item.description;

          if (item.type === "Gelir") {
            if (income[category]) {
              income[category] += amount;
            } else {
              income[category] = amount;
            }
          } else if (item.type === "Gider") {
            if (expense[category]) {
              expense[category] += amount;
            } else {
              expense[category] = amount;
            }
          }
        });

        setIncomeCategories(income);
        setExpenseCategories(expense);
        setIsLoading(false);
      } catch (error) {
        console.error("Veriler yüklenemedi:", error);
      }
    };

    fetchData();
  }, [email]);

  const colors = [
    "#36A2EB",
    "#FF6384",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#FF6B6B",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#073B4C",
    "#EF476F",
    "#F78C6B",
    "#A8DADC",
  ];

  const incomeData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <div>
        <h2>Gelir Kategorileri</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ width: "275px", height: "275px" }}>
            <Pie data={incomeData} />
          </div>
        )}
      </div>
      <div>
        <h2>Gider Kategorileri</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ width: "275px", height: "275px" }}>
            <Pie data={expenseData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCharts;

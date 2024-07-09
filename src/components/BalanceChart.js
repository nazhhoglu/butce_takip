import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceChart = ({ email }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data:", data); // Verilerin doğru alınıp alınmadığını kontrol edin

        if (!data.data) {
          throw new Error("Invalid data structure");
        }

        const userExpenses = data.data.filter(
          (item) =>
            item.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        console.log("User Expenses:", userExpenses); // Kullanıcıya ait giderlerin doğru şekilde alınıp alınmadığını kontrol edin

        let income = 0;
        let expense = 0;

        userExpenses.forEach((item) => {
          const amount = parseFloat(item.amount);
          if (isNaN(amount)) {
            console.warn(`Invalid amount value: ${item.amount}`);
            return;
          }
          if (item.type === "Gelir") {
            income += amount;
          } else if (item.type === "Gider") {
            expense += amount;
          } else {
            console.warn(`Unknown type: ${item.type}`);
          }
        });

        console.log("Total Income:", income); // Toplam gelirin doğru hesaplanıp hesaplanmadığını kontrol edin
        console.log("Total Expense:", expense); // Toplam giderin doğru hesaplanıp hesaplanmadığını kontrol edin

        setTotalIncome(income);
        setTotalExpense(expense);
        setIsLoading(false);
      } catch (error) {
        console.error("Veriler yüklenemedi:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const data = {
    labels: ["Gelir", "Gider"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2>Güncel Bakiye</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "250px", height: "250px" }}>
          <Doughnut data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default BalanceChart;

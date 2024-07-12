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

        console.log("Fetched Data:", data); // Verilerin doğru alınıp alınmadığı

        if (!data.data) {
          throw new Error("Invalid data structure");
        }

        const userExpenses = data.data.filter(
          (item) =>
            item.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        console.log("User Expenses:", userExpenses); // Kullanıcıya ait giderlerin doğru şekilde alınıp alınmadığı

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

        console.log("Total Income:", income); // Toplam gelirin doğru hesaplanıp hesaplanmadığı
        console.log("Total Expense:", expense);

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

  const balance = totalIncome - totalExpense;
  const balanceColor = balance >= 0 ? "green" : "red";
  const balanceText =
    balance >= 0 ? `+${balance.toFixed(2)}` : balance.toFixed(2);

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
    hover: {
      mode: null,
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: function (chart) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;

      ctx.clearRect(0, 0, width, height); // Mevcut çizimin temizlenmesi

      // Font boyutunu dinamik olarak ayarlamak
      let fontSize = Math.min(
        height / 114,
        width / ctx.measureText(balanceText).width
      );
      fontSize = fontSize > 1 ? fontSize : 1; // Çok küçük font boyutlarını önlemek için alt sınır koy
      ctx.font = `${fontSize}em sans-serif`;

      const textWidth = ctx.measureText(balanceText).width;
      ctx.textBaseline = "middle";

      const textX = Math.round((width - textWidth) / 2);
      const textY = height / 2;

      ctx.fillStyle = balanceColor;
      ctx.fillText(balanceText, textX, textY);
    },
  };

  return (
    <div>
      <h2>Güncel Bakiye</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "275px", height: "275px" }}>
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]} // Sadece bu grafik için eklentiyi uygula
          />
        </div>
      )}
    </div>
  );
};

export default BalanceChart;

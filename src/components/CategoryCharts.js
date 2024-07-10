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

  // Kategori renkleri
  const categoryColors = {
    Eğitim: "#36A2EB", // Mavi
    Kira: "#FF6384", // Kırmızı
    Fatura: "#FFCE56", // Sarı
    Yemek: "#4BC0C0", // Turkuaz
    Sağlık: "#9966FF", // Mor
    Spor: "#FF9F40", // Portakal
    Eğlence: "#C9CBCF", // Gri
    Alışveriş: "#FF6B6B", // Açık Kırmızı
    Ulaşım: "#FFD166", // Açık Sarı
    "Kredi Kartı": "#06D6A0", // Yeşil
    Sigorta: "#DDA0DD", // Orkide
    Maaş: "#FF1493", // Derin pembe
    Burs: "#8A2BE2", // Mavi menekşe
    Kredi: "#228B22", // Orman yeşili
    Diğer: "#808080", // Gümüş
  };

  // Gelir verileri
  const incomeData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories),
        backgroundColor: Object.keys(incomeCategories).map(
          (category) => categoryColors[category]
        ),
        hoverBackgroundColor: Object.keys(incomeCategories).map(
          (category) => categoryColors[category]
        ),
      },
    ],
  };

  // Gider verileri
  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: Object.keys(expenseCategories).map(
          (category) => categoryColors[category]
        ),
        hoverBackgroundColor: Object.keys(expenseCategories).map(
          (category) => categoryColors[category]
        ),
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

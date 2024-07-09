import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Select, Spin, Alert } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const { Option } = Select;

const MonthlyChart = ({ email }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState({ income: [], expense: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (selectedYear) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Veri yüklenemedi, lütfen tekrar deneyin.");
      }
      const data = await response.json();
      console.log("API'den Gelen Veri:", data);

      // Verileri filtreleme ve eşleştirme
      const userExpenses = data.data.filter((item) => {
        console.log("Filtrelenmemiş Eleman:", item);

        // Tarih formatını YYYY-MM-DD olarak düzenleyelim
        const [day, month, year] = item.calendar_date.split(".");
        const itemDate = new Date(`${year}-${month}-${day}`);

        return (
          item.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          itemDate.getFullYear() === selectedYear &&
          !isNaN(parseFloat(item.amount)) &&
          (item.type === "Gelir" || item.type === "Gider")
        );
      });

      console.log("Filtrelenmiş Veriler:", userExpenses);

      // Aylık gelir ve giderleri hesapla
      const monthlyIncome = Array(12).fill(0);
      const monthlyExpense = Array(12).fill(0);

      userExpenses.forEach((item) => {
        const amount = parseFloat(item.amount);
        const [day, month, year] = item.calendar_date.split(".");
        const monthIndex = new Date(`${year}-${month}-${day}`).getMonth();
        if (item.type === "Gelir") {
          monthlyIncome[monthIndex] += amount;
        } else {
          monthlyExpense[monthIndex] += amount;
        }
      });

      setMonthlyData({ income: monthlyIncome, expense: monthlyExpense });
      setIsLoading(false);
    } catch (error) {
      console.error("Veriler yüklenemedi:", error);
      setError("Veriler yüklenemedi, lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year, email]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  const data = {
    labels: [
      "OCA",
      "ŞUB",
      "MAR",
      "NİS",
      "MAY",
      "HAZ",
      "TEM",
      "AĞU",
      "EYL",
      "EKİ",
      "KAS",
      "ARA",
    ],
    datasets: [
      {
        label: "Gelir",
        data: monthlyData.income,
        backgroundColor: "#36A2EB",
      },
      {
        label: "Gider",
        data: monthlyData.expense,
        backgroundColor: "#FF6384",
      },
    ],
  };

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(value);
          },
        },
      },
    },
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div>
      <h2>Aylık Gelir ve Giderler</h2>
      <Select
        defaultValue={year}
        style={{ width: 120, marginBottom: 20 }}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="error" showIcon />}
      {isLoading ? (
        <Spin />
      ) : (
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default MonthlyChart;

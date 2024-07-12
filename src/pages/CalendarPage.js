import React, { useState, useEffect } from "react";
import { Badge, Calendar, message, Spin } from "antd";
import moment from "moment";
import "moment/locale/tr";
import { ConfigProvider } from "antd";
import trTR from "antd/es/locale/tr_TR";

moment.locale("tr");

const CalendarPage = ({ email }) => {
  const [spendingData, setSpendingData] = useState({});
  const [yearlyData, setYearlyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      fetchData(email);
    } else {
      message.error("Geçerli bir e-posta adresi bulunamadı.");
    }
  }, [email]);

  useEffect(() => {
    // Yıllık veri oluştur
    const yearly = {};
    Object.keys(spendingData).forEach((date) => {
      const year = moment(date).format("YYYY");
      if (!yearly[year]) {
        yearly[year] = {};
      }
      const month = moment(date).format("MMMM");
      if (!yearly[year][month]) {
        yearly[year][month] = [];
      }
      yearly[year][month].push(
        ...spendingData[date].filter((item) => item.email === email)
      );
    });
    setYearlyData(yearly);
  }, [spendingData, email]);

  const fetchData = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1&email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched spending data:", result.data);

        const formattedData = {};
        result.data.forEach((item) => {
          const date = moment(item.calendar_date, "DD.MM.YYYY").format(
            "YYYY-MM-DD"
          );
          if (!formattedData[date]) {
            formattedData[date] = [];
          }
          formattedData[date].push({
            type: item.type,
            amount: item.amount,
            description: item.description,
            email: item.email, // E-posta adresini kaydet
          });
        });
        console.log("Formatted spending data:", formattedData);
        setSpendingData(formattedData);
      } else {
        message.error("Veriler getirilemedi.");
      }
    } catch (error) {
      console.error("Error fetching spending data:", error);
      message.error("Veriler getirilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const getListData = (value) => {
    const date = value.format("YYYY-MM-DD");
    return spendingData[date]?.filter((item) => item.email === email) || null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div className="events">
        {listData &&
          listData.map((item, index) => (
            <Badge
              key={index}
              status={item.type === "Gelir" ? "success" : "error"}
              text={`${item.type}: ${item.amount} (${item.description})`}
            />
          ))}
      </div>
    );
  };

  const monthCellRender = (value) => {
    const year = value.format("YYYY");
    const month = value.format("MMMM");
    const data = yearlyData[year]?.[month];

    return (
      <div className="notes-month">
        <section>{month}</section>
        {data && (
          <ul className="events">
            {data.map((item, index) => (
              <li key={index}>
                <Badge
                  status={item.type === "Gelir" ? "success" : "error"}
                  text={`${item.type}: ${item.amount} (${item.description})`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <ConfigProvider locale={trTR}>
      <div style={{ position: "relative" }}>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default CalendarPage;

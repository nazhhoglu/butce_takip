import React, { useState, useEffect } from "react";
import { Badge, Calendar, message } from "antd";
import moment from "moment";

const CalendarPage = ({ email }) => {
  const [spendingData, setSpendingData] = useState({});

  useEffect(() => {
    if (email) {
      fetchData(email);
    } else {
      message.error("Geçerli bir e-posta adresi bulunamadı.");
    }
  }, [email]);

  const fetchData = async (email) => {
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
    }
  };

  const getListData = (value) => {
    const date = value.format("YYYY-MM-DD");
    return spendingData[date] || null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData &&
          listData.map((item, index) => (
            <li key={index}>
              <Badge
                status={item.type === "Gelir" ? "success" : "error"}
                text={`${item.type}: ${item.amount} (${item.description})`}
              />
            </li>
          ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default CalendarPage;

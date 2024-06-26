import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const StatisticsPage = ({ email }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState(undefined);
  const [filterDate, setFilterDate] = useState(undefined);
  const [filterDescription, setFilterDescription] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    applyFilters();
  }, [data, filterType, filterDate, filterDescription]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/derinhho/google_sheets/uwqwOcwWOTlHwVVM?tabId=Sayfa1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("Fetched data:", result);

      const filteredData = result.data.filter(
        (item) => item["email"] === email
      );
      console.log("Filtered data:", filteredData);

      const formattedData = filteredData.map((row, index) => ({
        id: index + 1,
        email: row["email"],
        type: row.type,
        date: row["calendar_date"],
        amount: row["amount"],
        description: row.description,
      }));
      console.log("Formatted data:", formattedData);
      setData(formattedData);
      setFilteredData(formattedData);
      setLoading(false);
    } catch (error) {
      message.error("Veriler getirilemedi.");
      setLoading(false);
    }
  };

  const deleteRecord = async (record) => {
    console.log("Deleting record with id:", record.id);
    const url = `https://v1.nocodeapi.com/derinhho/google_sheets/uwqwOcwWOTlHwVVM?tabId=Sayfa1&row_id=${record.id}`;
    console.log("Request URL:", url);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        message.success("Kayıt silindi.");
        fetchData();
      } else {
        message.error("Kayıt silinemedi.");
      }
    } catch (error) {
      message.error("Kayıt silinemedi.");
    }
  };

  const sendReport = () => {
    if (email) {
      message.info(`Raporunuz ${email} adresine gönderiliyor.`);
    } else {
      message.error(
        "Rapor gönderilemedi, geçerli bir e-posta adresi bulunamadı."
      );
    }
  };

  const applyFilters = () => {
    let filteredData = data.filter((item) => {
      if (filterType && item.type.toString() !== filterType.toString())
        return false;
      if (filterDate && !moment(item.date).isSame(moment(filterDate), "day"))
        return false;
      if (
        filterDescription &&
        !item.description
          .toLowerCase()
          .includes(filterDescription.toLowerCase())
      )
        return false;
      return true;
    });
    setFilteredData(filteredData);
  };

  const clearFilters = () => {
    setFilterType(undefined);
    setFilterDate(undefined);
    setFilterDescription(undefined);
    setFilteredData(data);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tür",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Miktar",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "İşlem",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => deleteRecord(record)} danger>
          Sil
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Form layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="Tür">
          <Select
            style={{ width: 160 }}
            onChange={(value) => setFilterType(value)}
            value={filterType}
            placeholder="Tür"
          >
            <Option value="1">Gelir</Option>
            <Option value="2">Gider</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tarih">
          <DatePicker
            style={{ width: 160 }}
            onChange={(date) => setFilterDate(date)}
            value={filterDate ? moment(filterDate) : undefined}
            placeholder="Tarih"
          />
        </Form.Item>
        <Form.Item label="Açıklama">
          <Select
            style={{ width: 160 }}
            onChange={(value) => setFilterDescription(value)}
            value={filterDescription}
            placeholder="Açıklama"
          >
            <Option value="Eğitim">Eğitim</Option>
            <Option value="Kira">Kira</Option>
            <Option value="Fatura">Fatura</Option>
            <Option value="Yemek">Yemek</Option>
            <Option value="Sağlık">Sağlık</Option>
            <Option value="Spor">Spor</Option>
            <Option value="Eğlence">Eğlence</Option>
            <Option value="Alışveriş">Alışveriş</Option>
            <Option value="Ulaşım">Ulaşım</Option>
            <Option value="Kredi Kartı">Kredi Kartı</Option>
            <Option value="Sigorta">Sigorta</Option>
            <Option value="Maaş">Maaş</Option>
            <Option value="Burs">Burs</Option>
            <Option value="Kredi">Kredi</Option>
            <Option value="Diğer">Diğer</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={applyFilters}>
            Filtrele
          </Button>
          <Button onClick={clearFilters} style={{ marginLeft: 8 }}>
            Filtreyi Temizle
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey={(record) => record.id}
        style={{ marginTop: "20px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={sendReport}>
          Rapor Al
        </Button>
      </div>
    </div>
  );
};

export default StatisticsPage;

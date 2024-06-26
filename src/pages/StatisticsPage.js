import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const StatisticsPage = ({ email }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      fetchData(email);
    } else {
      navigate("/");
    }
  }, [email, navigate]);

  const fetchData = async (email) => {
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
      console.log("Email:", email);

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
      setLoading(false);
    } catch (error) {
      message.error("Veriler getirilemedi.");
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const formattedDate = values.date.format("DD.MM.YYYY");
      const newRow = [
        [email, values.type, formattedDate, values.amount, values.description],
      ];

      const response = await fetch(
        "https://v1.nocodeapi.com/derinhho/google_sheets/uwqwOcwWOTlHwVVM?tabId=Sayfa1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );

      if (response.ok) {
        message.success("Kayıt eklendi.");
        form.resetFields();
        fetchData(email);
      } else {
        message.error("Kayıt eklenemedi.");
      }
    } catch (error) {
      message.error("Kayıt eklenemedi.");
    }
  };

  const deleteRecord = async (record) => {
    console.log("Deleting record with id:", record.id + 1);
    const url = `https://v1.nocodeapi.com/derinhho/google_sheets/uwqwOcwWOTlHwVVM?tabId=Sayfa1&row_id=${
      record.id + 1
    }`;
    console.log("Request URL:", url);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/derinhho/google_sheets/uwqwOcwWOTlHwVVM?tabId=Sayfa1&row_id=${
          record.id + 1
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        message.success("Kayıt silindi.");
        fetchData(email);
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
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item
          name="email"
          initialValue={email}
          rules={[{ required: true, message: "Email gerekli" }]}
        >
          <Input placeholder="Kullanıcı Email" disabled />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Tür gerekli" }]}
        >
          <Select placeholder="Tür">
            <Option value="Gelir">Gelir</Option>
            <Option value="Gider">Gider</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Tarih gerekli" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Miktar gerekli" }]}
        >
          <Input placeholder="Miktar" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Açıklama gerekli" }]}
        >
          <Select placeholder="Açıklama">
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
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={sendReport} style={{ marginTop: "20px" }}>
        Rapor Gönder
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default StatisticsPage;

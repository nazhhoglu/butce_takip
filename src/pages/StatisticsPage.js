import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, DatePicker, Select, message } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const StatisticsPage = ({ email }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // navigate fonksiyonunu kullanmak için

  useEffect(() => {
    if (email) {
      fetchData(email);
    } else {
      // Eğer email prop'u boşsa, kullanıcıyı giriş sayfasına yönlendir
      navigate("/");
    }
  }, [email, navigate]);

  const fetchData = async (email) => {
    setLoading(true);
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
      const result = await response.json();
      // Email adresine göre filtreleme yapıyoruz
      const filteredData = result.data.filter((item) => item[0] === email);
      // Verileri doğru formatta ayarlıyoruz
      const formattedData = filteredData.map((row, index) => ({
        id: index + 1, // ID değerini ayarlıyoruz
        email: row[0],
        type: row[1],
        date: row[2],
        amount: row[3],
        description: row[4],
      }));
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      message.error("Veriler getirilemedi.");
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const formattedDate = values.date.format("YYYY-MM-DD");
      const newRow = [
        [email, values.type, formattedDate, values.amount, values.description],
      ];

      const response = await fetch(
        "https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1",
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
        fetchData(email); // Verileri yeniden çek
      } else {
        message.error("Kayıt eklenemedi.");
      }
    } catch (error) {
      message.error("Kayıt eklenemedi.");
    }
  };

  const deleteRecord = async (record) => {
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1&row_id=${record.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        message.success("Kayıt silindi.");
        fetchData(email); // Verileri yeniden çek
      } else {
        message.error("Kayıt silinemedi.");
      }
    } catch (error) {
      message.error("Kayıt silinemedi.");
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
        <Form.Item name="description">
          <Input placeholder="Açıklama" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default StatisticsPage;

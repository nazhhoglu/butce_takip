import React from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const date = moment();

const HomePage = ({ email }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
        // Burada gerekirse başka bir işlem yapabilirsiniz.
      } else {
        message.error("Kayıt eklenemedi.");
      }
    } catch (error) {
      message.error("Kayıt eklenemedi.");
    }
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="inline">
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
    </div>
  );
};

export default HomePage;

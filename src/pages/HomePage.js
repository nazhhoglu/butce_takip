import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import BalanceChart from "../components/BalanceChart";
import CategoryCharts from "../components/CategoryCharts"; // Yeni bileşeni içe aktarın
import MonthlyChart from "../components/MonthlyChart";

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
      } else {
        message.error("Kayıt eklenemedi.");
      }
    } catch (error) {
      message.error("Kayıt eklenemedi.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "100px" }}>
        <BalanceChart email={email} />
        <CategoryCharts email={email} />{" "}
        {/* CategoryCharts bileşenini ekleyin */}
      </div>
      <div style={{ display: "flex", gap: "100px", padding: "50px" }}>
        <MonthlyChart email={email} />
        <Form form={form} onFinish={onFinish}>
          <h2>Gelir-Gider Ekleyiniz</h2>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tür"
                name="type"
                rules={[{ required: true, message: "Tür gerekli" }]}
              >
                <Select placeholder="Tür">
                  <Option value="Gelir">Gelir</Option>
                  <Option value="Gider">Gider</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tarih"
                name="date"
                rules={[{ required: true, message: "Tarih gerekli" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Miktar"
                name="amount"
                rules={[{ required: true, message: "Miktar gerekli" }]}
              >
                <Input placeholder="Miktar" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Açıklama"
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
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;

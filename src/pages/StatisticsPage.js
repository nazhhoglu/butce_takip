import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  DatePicker,
  Select,
  message,
  Button,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr"; // Türkçe locale ekleyin
moment.locale("tr"); // Türkçe locale'ı aktif edin

const { Option } = Select;

const StatisticsPage = ({ email }) => {
  const [data, setData] = useState([]); // API'den çekilen veriler
  const [filteredData, setFilteredData] = useState([]); // Filtrelenmiş veriler
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [filterType, setFilterType] = useState(undefined); // Tür filtresi
  const [filterDate, setFilterDate] = useState(undefined); // Tarih filtresi
  const [filterDescription, setFilterDescription] = useState(undefined); // Açıklama filtresi
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      fetchData(); // E-posta varsa verileri çek
    } else {
      navigate("/"); // E-posta yoksa anasayfaya yönlendir
    }
  }, [email, navigate]);

  useEffect(() => {
    applyFilters(); // Filtreler değiştiğinde filtreleri uygula
  }, [data, filterType, filterDate, filterDescription]);

  const fetchData = async () => {
    setLoading(true); // Yükleme durumunu başlat
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
      console.log("Fetched data:", result);

      // API'den gelen verileri e-posta ile filtrele
      const filteredData = result.data.filter(
        (item) => item["email"] === email
      );
      console.log("Filtered data:", filteredData);

      // Verileri formatla ve state'e kaydet
      const formattedData = filteredData.map((row, index) => ({
        id: index + 1,
        email: row["email"],
        type: row.type,
        date: moment(row["calendar_date"], "DD.MM.YYYY").format("YYYY-MM-DD"), // Tarih formatını güncelleyerek YYYY-MM-DD formatına dönüştür
        amount: row["amount"],
        description: row.description,
      }));
      console.log("Formatted data:", formattedData);
      setData(formattedData);
      setFilteredData(formattedData);
      setLoading(false); // Yükleme durumunu bitir
    } catch (error) {
      message.error("Veriler getirilemedi.");
      setLoading(false); // Yükleme durumunu bitir
    }
  };

  const deleteRecord = async (record) => {
    console.log("Deleting record with id:", record.id + 1);
    const url = `https://v1.nocodeapi.com/nazhhoglu/google_sheets/UwVbQyaVnoXrJYbw?tabId=Sayfa1&row_id=${
      record.id + 1
    }`;
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
        fetchData(); // Silme işlemi başarılı olursa verileri yeniden çek
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
    // Verileri filtrele
    let filteredData = data.filter((item) => {
      const matchesType = filterType
        ? item.type.toString() === filterType.toString()
        : true;
      const matchesDate = filterDate
        ? moment(item.date, "YYYY-MM-DD").isSame(moment(filterDate), "day")
        : true;
      const matchesDescription = filterDescription
        ? item.description
            .toLowerCase()
            .includes(filterDescription.toLowerCase())
        : true;

      return matchesType && matchesDate && matchesDescription;
    });
    setFilteredData(filteredData);
  };

  const clearFilters = () => {
    setFilterType(undefined);
    setFilterDate(undefined);
    setFilterDescription(undefined);
    setFilteredData(data); // Filtreleri temizleyip tüm verileri göster
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
      render: (text) => moment(text, "YYYY-MM-DD").format("DD.MM.YYYY"),
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
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Form layout="inline">
            <Form.Item label="Tür">
              <Select
                style={{ width: 160 }}
                onChange={(value) => setFilterType(value)}
                value={filterType}
                placeholder="Tür"
              >
                <Option value="Gelir">Gelir</Option>
                <Option value="Gider">Gider</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tarih">
              <DatePicker
                style={{ width: 160 }}
                onChange={(date) => setFilterDate(date)}
                value={
                  filterDate ? moment(filterDate, "DD.MM.YYYY") : undefined
                }
                format="DD.MM.YYYY"
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
              <Button onClick={clearFilters} style={{ marginLeft: 8 }}>
                Filtreyi Temizle
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Button type="primary" onClick={sendReport}>
            Rapor Al
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey={(record) => record.id}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default StatisticsPage;

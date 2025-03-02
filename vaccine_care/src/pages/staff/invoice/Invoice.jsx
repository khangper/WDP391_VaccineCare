import "./Invoice.css";
import { useEffect, useState } from "react";
import { Table, Radio, Tag } from "antd";
import axios from "axios";

const Invoice = ({record}) => {
  const [data, setData] = useState([
  ]);

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [invoiceStatus, setInvoiceStatus] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!record?.id) return; // Kiểm tra nếu không có record thì không fetch

    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(
          `https://vaccinecare.azurewebsites.net/api/Payment/detail/${record.id}`
        );
        const invoiceData = response.data;
        console.log("Dữ liệu nhận được:", invoiceData);

        // Kiểm tra xem có dữ liệu vắc xin không
        const formattedData = invoiceData.vaccines?.$values.map((item) => ({
          id: item.$id,
          vaccine: item.vaccineName,
          quantity: item.doseNumber,
          price: item.pricePerDose.toLocaleString(),
          total: (item.pricePerDose * item.doseNumber).toLocaleString(),
        })) || [];

        setData(formattedData);
        setTotalPrice(invoiceData.totalPrice);
        setPaymentMethod(invoiceData.paymentMethod.toLowerCase());
        setInvoiceStatus(invoiceData.paymentStatus === "Not paid" ? "pending" : "paid");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
      }
    };

    fetchInvoiceData();
  }, [record]);
  const columns = [
    {
      title: "Vắc xin",
      dataIndex: "vaccine",
      width: "30%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "20%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "20%",
    },
    {
      title: "Tổng giá",
      dataIndex: "total",
      width: "30%",
    },
  ];

  const handleConfirmPayment = () => {
    setInvoiceStatus("paid");
  };

  return (
    <div className="invoice">
      <div className="invoice_all">
        <h3>Hóa đơn</h3>
        <div className="invoice_top">
          <div className="invoice_date">
            Ngày/tháng/năm: <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="invoice_no">
            Số hóa đơn: <span>{record?.id || "N/A"}</span>
          </div>
        </div>

        <div className="invoice_middle">
          <div className="invoice_to">
            Hóa đơn gửi đến:
            <div className="invoice_name">
              Tên bé: <span>Nguyen Van A</span>
            </div>
          </div>
          <div className="invoice_pay">
            Thanh toán cho:
            <div className="invoice_name">
              Công ty: <span>Vaccine Care</span>
            </div>
          </div>
        </div>

        <div className="invoice_bottom">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey={(record) => record.id}
          />
          <div className="invoice_total">
            Tổng: <span>{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="payment">
        <h3>Hình thức thanh toán</h3>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
        >
          <Radio value="cash">Tiền mặt</Radio>
          <Radio value="bank">Chuyển khoản</Radio>
          
        </Radio.Group>
      </div>

      <div className="invoice_actions">
        

        {invoiceStatus === "pending" && (
          <>
            <Tag color="red">Chưa thanh toán</Tag>
            <button type="submit" className="button_payment" onClick={handleConfirmPayment}>
              Xác nhận thanh toán
            </button>
          </>
        )}

        {invoiceStatus === "paid" && <Tag color="green">Đã thanh toán</Tag>}
      </div>
    </div>
  );
};

export default Invoice;

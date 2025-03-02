import "./Invoice.css";
import { useState } from "react";
import { Table, Radio, Tag } from "antd";

const Invoice = ({record}) => {
  const [data, setData] = useState([
    {
      id: 1,
      vaccine: "Sextaron",
      quantity: 1,
      price: "500.000",
      total: "500.000",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [invoiceStatus, setInvoiceStatus] = useState(null);

  const columns = [
    {
      title: "Vắc xin",
      dataIndex: "vaccine",
      width: "10%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "20%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "15%",
    },
    {
      title: "Tổng giá",
      dataIndex: "total",
      width: "20%",
    },
  ];

  const handleCreateInvoice = () => {
    setInvoiceStatus("pending");
  };

  const handleConfirmPayment = () => {
    setInvoiceStatus("paid");
  };

  return (
    <div className="invoice">
      <div className="invoice_all">
        <h3>Hóa đơn</h3>
        <div className="invoice_top">
          <div className="invoice_date">
            Ngày/tháng/năm: <span>15/02/2025</span>
          </div>
          <div className="invoice_no">
            Số hóa đơn: <span>12356</span>
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
            Tổng: <span>500.000</span>
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
        {invoiceStatus === null && (
          <button type="submit" className="button_payment" onClick={handleCreateInvoice}>
            Tạo hóa đơn
          </button>
        )}

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

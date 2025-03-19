import "./Invoice.css";
import { useEffect, useRef, useState } from "react";
import { Table, Radio, Tag } from "antd";
import api from "../../../services/api";

const Invoice = ({ record, details }) => {
  const [data, setData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("N/A");
  const intervalRef = useRef(null);

  const fetchInvoiceData = async () => {
    if (!record?.id) return;
    try {
      const response = await api.get(`/Payment/details/${record.id}`);
      const invoiceData = response.data;
      console.log("Dữ liệu nhận được:", invoiceData);

      // Kiểm tra xem có dữ liệu vắc xin không
      const formattedData =
        invoiceData.items?.$values.map((item) => ({
          id: item.$id,
          vaccine: item.vaccineName,
          quantity: item.doseNumber,
          price: item.pricePerDose.toLocaleString(),
          total: (item.pricePerDose * item.doseNumber).toLocaleString(),
        })) || [];

      setData(formattedData);
      setTotalPrice(invoiceData.totalPrice);
      setPaymentMethod(invoiceData.paymentMethod);
      setPaymentStatus(invoiceData.paymentStatus);
      setInvoiceNumber(invoiceData.paymentId || "N/A");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
    }
  };
  useEffect(() => {
    fetchInvoiceData();

    // Chỉ tạo polling nếu chưa có interval và trạng thái chưa "Paid"
    if (!intervalRef.current && paymentStatus !== "Paid") {
      intervalRef.current = setInterval(fetchInvoiceData, 5000);
    }

    // Cleanup interval khi component unmount
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [record]); // Chạy lại khi record thay đổi

  // Dừng polling khi paymentStatus = "Paid"
  useEffect(() => {
    if (paymentStatus === "Paid" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [paymentStatus]);

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

  const handleConfirmPayment = async () => {
    try {

      const response = await api.put(
        `/Payment/update-status-payment-status/confirmPayment?appointmentId=${record.id}&paymentMethod=${paymentMethod}`,
        // null,
        // {
        //   params: {
        //     appointmentId: record.id,
        //     paymentMethod,
        //   },
        // }
      );
      console.log(response.data);

      setPaymentStatus("Paid");
      fetchInvoiceData();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
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
            Số hóa đơn: <span>{invoiceNumber}</span>
          </div>
        </div>

        <div className="invoice_middle">
          <div className="invoice_to">
            Hóa đơn gửi đến:
            <div className="invoice_name">
              Tên bé: <span>{details?.childFullName}</span>
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
          <Radio value="Cash">Tiền mặt</Radio>
        </Radio.Group>
      </div>

      <div className="invoice_actions">
        {paymentStatus === "Paid" ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <>
            <Tag color="red">Chưa thanh toán</Tag>
            <button
              type="submit"
              className="button_payment"
              onClick={handleConfirmPayment}
            >
              Xác nhận thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoice;

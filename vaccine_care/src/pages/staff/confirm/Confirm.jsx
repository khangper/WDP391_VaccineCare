import "./Confirm.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table, Select } from "antd";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  options,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {inputType === "select" ? (
          <Select ref={inputRef} onBlur={save} onChange={save}>
            {options.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const Confirm = ({ record, details }) => {
  const [dataSource, setDataSource] = useState([]);

  const vaccineOptions = ["Sextaron", "Pentaxim", "Infanrix", "Rotateq"];
  const typeVaccine = ["Lẻ", "Gói"];
  const listDoctors = ["Mr. Dona", "Mr. Pika"];
  const listRooms = ["01", "02"];

  useEffect(() => {
    if (record && details) {
      setDataSource([
        {
          key: record.id,
          name: record.fullname,
          date: record.date,
          vaccine: details.vaccineName || "",
          type_vaccine: details.vaccineType  === "Single" ? "Lẻ" : "Gói",
          doctor: details.doctorId || "N/A",
          room: details.roomId || "N/A",
        },
      ]);
    }
  }, [record, details]);

  const defaultColumns = [
    {
      title: "Tên bé",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      width: "15%",
    },
    {
      title: "Vắc xin",
      dataIndex: "vaccine",
      width: "15%",
      editable: true,
      inputType: "select",
      options: vaccineOptions,
    },
    {
      title: "Loại",
      dataIndex: "type_vaccine",
      with: "10%",
      editable: true,
      inputType: "select",
      options: typeVaccine,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      with: "15%",
      editable: true,
      inputType: "select",
      options: listDoctors,
    },
    {
      title: "Phòng",
      dataIndex: "room",
      with: "15%",
      editable: true,
      inputType: "select",
      options: listRooms,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        inputType: col.inputType || "text",
        options: col.options || [],
      }),
    };
  });
  return (
    <div className="confirm">
      <h3>Xác nhận thông tin</h3>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Confirm;

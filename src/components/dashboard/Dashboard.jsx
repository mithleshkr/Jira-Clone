import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { Add } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import "./Style.css";
import "antd/dist/antd.css";
import { Form, Modal, Select, Input, Card, Col, Row } from "antd";
import { db } from "../../firebase";
import swal from "sweetalert";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignTo, setAssignTo] = useState("");

  const title = <h4>Create New Task</h4>;

  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            db.collection("task-details").add({
              TaskTitle: taskTitle,
              TaskDescreption: taskDesc,
              EndDate: endDate,
              AssignTo: assignTo,
            });
            swal({
              title: "Great",
              text: "Task Added Successfully",
              icon: "success",
              timer: "2000",
              button: false,
            });
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="task title"
          label="Task Title"
          rules={[
            {
              required: true,
              message: "Please input the task title!",
            },
          ]}
        >
          <Input
            placeholder="Enter Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          {/* <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Title"/> */}
        </Form.Item>
        <Form.Item name="task description" label="Task Description">
          <Input
            placeholder="Enter Task Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          {/* <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Description" type="textarea"/> */}
        </Form.Item>
        <Form.Item
          name="end-date"
          label="End Date"
          rules={[
            {
              required: true,
              message: "Please select end date",
            },
          ]}
        >
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {/* <TextField type="date" variant="outlined" size="small" fullWidth/> */}
        </Form.Item>
        <Form.Item
          name="assign-to"
          label="Assign to"
          rules={[
            {
              required: true,
              message: "Select assignie",
            },
          ]}
        >
          <Select
            defaultValue="select assign to"
            value={assignTo}
            onChange={(value) => setAssignTo(value)}
          >
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
            <Select.Option value="demo4">Demo4</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Dashboard = () => {
  const [displaydata, setDisplayData] = useState([]);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  function Fetchdata() {
    db.collection("task-details")
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length) {
          snapshot.docs.forEach((doc) => {
            setDisplayData((prev) => {
              return [...prev, { data: doc.data(), id: doc.id }];
            });
          });
        }
        console.log(displaydata);
      });
  }
  useEffect(() => {
    Fetchdata();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex" }}>
          <Navbar />
        </div>

        <div style={{ width: "80%" }}>
          {/* <card> */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginTop: "5px",
            }}
          >
            <Button
              style={{ backgroundColor: "#1890ff", color: "white" }}
              variant="contained"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Add />
              Add Task
            </Button>
          </div>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />

          <div>
            <Row gutter={15}>
              <Col span={8}>
                <Card title="TO DO" bordered={false}>
                  <div style={{ maxHeight: "67vh", overflow: "auto" }}>
                    {displaydata.map((task) => (
                      <div className="todo-div">
                        <h3>{task.data.TaskTitle}</h3>
                        <h5>{task.data.EndDate}</h5>
                        <h5>{task.data.AssignTo}</h5>
                        <p>{task.data.TaskDescreption}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="IN PROGRESS" bordered={false}>
                  going on task
                </Card>
              </Col>
              <Col span={8}>
                <Card title="DONE" bordered={false}>
                  completed task
                </Card>
              </Col>
            </Row>
          </div>

          {/* </card> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

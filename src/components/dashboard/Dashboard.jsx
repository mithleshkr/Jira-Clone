import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { Add } from "@material-ui/icons";
import { Button, Avatar, TextField, CircularProgress } from "@material-ui/core";
import "./Style.css";
import "antd/dist/antd.css";
import {
  Form,
  Modal,
  Select,
  Input,
  Card,
  Col,
  Row,
  Drawer
} from "antd";
import { db } from "../../firebase";
import swal from "sweetalert";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

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
  const [visibleD, setVisibleD] = useState(false);
  const [size, setSize] = useState();
  const [displaydata, setDisplayData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tTitle, setTtitle] = useState("");
  const [tDesc, setTdesc] = useState("");
  const [tEndDate, setTendDate] = useState("");
  const [tAssignTo, setTassignTo] = useState("");

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
      });
  }

  //const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    Fetchdata();
  }, []);

  // const toProgress = (id) => {
  //   alert(id);
  // };
  const showLargeDrawer = (id) => {
    console.log(id);
    setSize("600px");
    setVisibleD(true);

    let item = displaydata.find((item) => id === item.id);
    setTtitle(item.data.TaskTitle);
    setTdesc(item.data.TaskDescreption);
    setTassignTo(item.data.AssignTo);
    setTendDate(item.data.EndDate);
    // console.log("item====>", item);

    // setTaskTitle(item.taskTitle)
    // console.log("function called ====>",displaydata[id])
  };

  const onClose = () => {
    setVisibleD(false);
  };

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
                  <div>
                    <h4>TO DO</h4>
                  </div>
                  {/* <div style={{ maxHeight: "67vh", overflow: "auto" }}> */}
                  {/* <PerfectScrollbar style={{ height: "67vh" }}> */}
                  {displaydata.map((task) => (
                    <div
                      className="todo-div"
                      key={task.id}
                      onClick={() => showLargeDrawer(task.id)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "16px",
                            marginBottom: 0,
                          }}
                        >
                          {task.data.TaskTitle}
                        </p>
                        <Avatar style={{ width: 30, height: 30 }}>
                          {" "}
                          {task.data.AssignTo[0]}
                        </Avatar>

                        {/* {task.data.AssignTo} */}
                      </div>

                      <div>
                        <p
                          style={{
                            fontWeight: 300,
                            fontSize: "14px",
                            color: "grey",
                          }}
                        >
                          {task.data.TaskDescreption}
                        </p>
                        {/* <TextField
                        variant="outlined"
                        disabled
                        style={{width:"250px"}} value={task.data.TaskDescreption} /> */}
                      </div>

                      <div
                        style={{
                          marginLeft: "4px",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 0,
                        }}
                      >
                        <h5 style={{ fontWeight: 600 }}>{task.data.EndDate}</h5>

                        {/* <div>
                        <CircularProgress
                        style={{width:"16px"}}
                        variant="determinate" value={progress} />
                        </div> */}
                      </div>
                    </div>
                  ))}
                  <Drawer
                
                    title="TO DO TASK"
                    placement="right"
                    size={size}
                    onClose={onClose}
                    visible={visibleD}
                    // extra={
                    //   <Space>
                    //     <Button onClick={onClose}>Cancel</Button>
                    //     <Button type="primary" onClick={onClose}>
                    //       OK
                    //     </Button>
                    //   </Space>
                    // }
                  >
                    <h2
                    style={{fontWeight: "500px",
                      fontSize: "16px"}}
                    >{tTitle}</h2>
                    <h3
                      style={{
                        fontWeight: 300,
                        color: "grey",
                      }}
                    >
                      {tDesc}
                    </h3>
                    <div >
                    <h4
                      style={{
                        display:"flex",

                        fontWeight: 300,
                        color: "grey",
                      }}
                    >{' '}
                      <Avatar style={{ width: 20, height: 20,marginRight:"5px" }}>
                          {" "}
                          {tAssignTo[0]}
                        </Avatar> {tAssignTo}
                    </h4>
                    </div>
                    <h5
                      style={{
                        fontWeight: 600,
                        color: "grey",
                        marginBottom:10
                      }}
                    >
                      {tEndDate}
                    </h5>
                        
                    <Form.Item
                    style={{marginBottom:"10px"}}
                      name="status"
                     
                      rules={[
                        {
                          
                          message: "Select Status",
                        },
                      ]}
                    >
                      <Select defaultValue="select status" style={{width:"180px"}}>
                        <Select.Option value="demo1">TO DO</Select.Option>
                        <Select.Option value="demo2">IN PROGRESS</Select.Option>
                        <Select.Option value="demo3">DONE</Select.Option>
                      </Select>
                    </Form.Item>
                      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
                    <Button
                    style={{ backgroundColor: "#1890ff", color: "white" }}
                    size="small"
                    > SAVE</Button>
                    </div>
                    {/* <input value={cardData.data.TaskTitle} />   */}
                  </Drawer>
                  {/* </PerfectScrollbar> */}
                  {/* </div> */}
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

import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { Add } from "@material-ui/icons";
import { Button, Avatar } from "@material-ui/core";
import "./Style.css";
import "antd/dist/antd.css";
import { Form, Modal, Select, Input, Card, Col, Row } from "antd";
import { db } from "../../firebase";
import swal from "sweetalert";
import "react-perfect-scrollbar/dist/css/styles.css";

import "dragula/dist/dragula.css";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("");

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
              Status: status,
            });
            swal({
              title: "Great",
              text: "Task Added Successfully",
              icon: "success",
              timer: "2000",
              button: false,
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
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
        </Form.Item>
        <Form.Item name="task description" label="Task Description">
          <Input
            placeholder="Enter Task Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
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
            <Select.Option value="Mithlesh">Mithlesh</Select.Option>
            <Select.Option value="Tushar">Tushar</Select.Option>
            <Select.Option value="Shivam">Shivam</Select.Option>
            <Select.Option value="Digambar">Digambar</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="statsu"
          label="Status"
          rules={[
            {
              required: true,
              message: "Select status",
            },
          ]}
        >
          <div>
            <select
              style={{ width: "470px", height: "30px" }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>select status</option>
              <option value="To-Do">TO DO</option>
              <option value="In-Progress">IN PROGRESS</option>
              <option value="Done">DONE</option>
            </select>
          </div>
          {/* <input type="dropdown" value="11" /> */}
          {/* <Select
            defaultValue="select status"
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Select.Option value="To-Do">TO DO</Select.Option>
            <Select.Option value="In-Progress">IN PROGRESS</Select.Option>
            <Select.Option value="Done">DONE</Select.Option>
          </Select> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Dashboard = () => {
  const [displaydata, setDisplayData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [toDo, setToDo] = useState("To Do");
  const [inProgress, setInProgress] = useState("In Progress");
  const [done, setDone] = useState("Done");
  const [newStatus, setNewStatus] = useState("");

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
    updateData();
  }, []);
  
  // function editColorDetails(_id) {
  //   //edit popup form open
  //   setEditColor(true);

  //   setUpdateColorid(_id);
  //   let color = getcolordetails.find((color) => _id === color._id);
  //   setTitle(color.title);
  //   setColourCode(color.colourCode);
  //   setDesc(color.desc);
  // }

  

  const updateData = (id,e) => {
    console.log(e)
    
   
  
   
      try{
       db.collection("task-details").doc(id).update({
        Status:e
       }
        
       ).then(setTimeout(()=>{
        window.location.reload(false);
       },2000))}catch(error){
        console.log(error)
       }
    // db.collection("task-details").doc(id).update({
    //   Status:st
    // })
  };

  const filterData = (data) => {
    return data.data.Status === "To-Do";
  };
  var filterDataToDo = displaydata.filter(filterData);

  const filterInProgress = (data) => {
    return data.data.Status === "In-Progress";
  };
  var filterDataInProgress = displaydata.filter(filterInProgress);

  const filterDone = (data) => {
    return data.data.Status === "Done";
  };
  var filterDataDone = displaydata.filter(filterDone);

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
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {/* <div style={{ maxHeight: "67vh", overflow: "auto" }}> */}
                    {/* <PerfectScrollbar style={{ height: "67vh" }}> */}
                    {filterDataToDo.map((task) => (
                      <div
                        className="todo-div"
                        key={task.id}
                        // onClick={() => showLargeDrawer(task.id)}
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
                        </div>

                        <div
                          style={{
                            marginLeft: "4px",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 0,
                          }}
                        >
                          <h5 style={{ fontWeight: 600 }}>
                            {task.data.EndDate}
                          </h5>
                          <h5>
                            <select onChange={(e)=> updateData(task.id,e.target.value )}>
                              
                              <option value="To-Do">{task.data.Status}</option>
                              <option value="In-Progress">In-Progress</option>
                              <option value="Done">Done</option>
                            </select>
                          </h5>
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="IN PROGRESS" bordered={false}>
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {/* {displaydata.filter((status)=>(status.value == 'To-Do',console.log("this is tototo",status)))} */}
                    {filterDataInProgress.map((task) => (
                      <div
                        className="todo-div"
                        key={task.id}
                        // onClick={() => showLargeDrawer(task.id)}
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
                        </div>

                        <div
                          style={{
                            marginLeft: "4px",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 0,
                          }}
                        >
                          <h5 style={{ fontWeight: 600 }}>
                            {task.data.EndDate}
                          </h5>
                          <h5>
                          <select onChange={(e)=> updateData(task.id,e.target.value )}>
                          <option value="In-Progress">{task.data.Status}</option>
                              <option value="To-Do">To Do</option>
                              
                              <option value="Done">Done</option>
                            </select>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="DONE" bordered={false}>
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {filterDataDone.map((task) => (
                      <div
                        className="todo-div"
                        key={task.id}
                        // onClick={() => showLargeDrawer(task.id)}
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
                        </div>

                        <div
                          style={{
                            marginLeft: "4px",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 0,
                          }}
                        >
                          <h5 style={{ fontWeight: 600 }}>
                            {task.data.EndDate}
                          </h5>
                          <h5>
                          <select onChange={(e)=> updateData(task.id,e.target.value )}>
                          <option value="Done">{task.data.Status}</option>
                              <option value="To-Do"> To Do</option>
                              <option value="In-Progress"> In Progress</option>
                              
                            </select>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
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

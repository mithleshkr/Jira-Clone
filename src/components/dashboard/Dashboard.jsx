import React, { useState, useEffect, memo } from "react";

//Header Component
import Header from "../header/Header";

//Sidebar Component
import Navbar from "../navbar/Navbar";

//drawer
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

//loadsh
//import _ from "lodash";

//loader
//import Loader from "../../loader/Loader";

//material icons
import { Add } from "@material-ui/icons";

//material core
import { Button, Avatar } from "@material-ui/core";

//style page
import "./Style.css";
import "antd/dist/antd.css";

//ant design
import { Form, Modal, Select, Input, Card, Col, Row } from "antd";

//firebase db
import { db } from "../../firebase";

//sweetalert
import swal from "sweetalert";

var his = {};
var currentTimestamp = Date.now();
console.log(currentTimestamp); // get current timestamp
var date = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(currentTimestamp);

//*Form to add task
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
      //*to send form data in firestore
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
              Time: date,
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
            }, 1500);
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
            <Select.Option value="Anurag">Anurag</Select.Option>
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Dashboard = () => {
  const [displaydata, setDisplayData] = useState([]);
  const [displayHistory, setDisplayHistory] = useState([]);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  //*function to fetch data from collections
  async function Fetchdata() {
    try {
      await db
        .collection("task-details")
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
    } catch (error) {
      console.log("fetch error", error);
    }
  }
  //*function to fetch history from collections
  function FetchHistory() {
    try {
      db.collection("task-activity")
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length) {
            snapshot.docs.forEach((doc) => {
              setDisplayHistory((prev) => {
                return [...prev, { data: doc.data(), id: doc.id }];
              });
            });
          }
        });
    } catch (error) {
      console.log("fetch error", error);
    }
  }

  //useEffect
  useEffect(() => {
    Fetchdata();
    updateData();
    FetchHistory();
  }, []);

  //   let color = getcolordetails.find((color) => _id === color._id);

  //*function to update collection data by id
  const updateData = async (id, e) => {
    console.log(e);
    try {
      await db
        .collection("task-details")
        .doc(id)
        .update({
          Status: e,
          UpdatedTime: date,
        })
        .then(
          db.collection("task-activity").add({
            Status: e,
            ID: id,
            Time: date,
          }),
          setTimeout(() => {
            window.location.reload(false);
          }, 1000)
        )
        .finally();
    } catch (error) {
      console.log(error);
    }
  };

  //filter of TODO
  const filterData = (data) => {
    return data.data.Status === "To-Do";
  };
  var filterDataToDo = displaydata.filter(filterData);

  //filter of IN-PROGRESS
  const filterInProgress = (data) => {
    return data.data.Status === "In-Progress";
  };
  var filterDataInProgress = displaydata.filter(filterInProgress);

  //filter of DONE
  const filterDone = (data) => {
    return data.data.Status === "Done";
  };
  var filterDataDone = displaydata.filter(filterDone);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = (id) => {
    setIsOpen((prevState) => !prevState);
    let activity = displaydata.find((activity) => id === activity.id);
    his = activity.data;
    console.log("history", activity.data.TaskTitle);
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
                {/* fetching data of TO DO Status */}
                <Card title="TO DO" bordered={false}>
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {filterDataToDo
                      .sort((a, b) => {
                        return new Date(b.data.Time) - new Date(a.data.Time);
                      })
                      .map((task, id) => (
                        <div className="todo-div" key={task.id}>
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
                            <p
                              style={{
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                              onClick={() => toggleDrawer(task.id)}
                              // onClick={()=>showDrawer(task.id)}
                            >
                              ...
                            </p>

                            <Avatar
                              style={{
                                width: 30,
                                height: 30,
                                background: "#1890ff",
                              }}
                            >
                              {" "}
                              {task.data.AssignTo[0]}
                            </Avatar>
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
                              <select
                                style={{
                                  border: "1px solid #1890ff",
                                  cursor: "pointer",
                                }}
                                onChange={(e) =>
                                  updateData(task.id, e.target.value)
                                }
                              >
                                <option value="To-Do">
                                  {task.data.Status}
                                </option>
                                <option value="In-Progress">In-Progress</option>
                              </select>
                            </h5>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
                {/* <Drawer placement="right" open={open}>
                              <h1>hhh</h1>
                              </Drawer> */}
              </Col>

              <Col span={8}>
                {/* fetching data of IN PROGRESS Status */}
                <Card title="IN PROGRESS" bordered={false}>
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {filterDataInProgress
                      .sort((a, b) => {
                        return new Date(b.data.Time) - new Date(a.data.Time);
                      })
                      .map((task) => (
                        <div className="todo-div1" key={task.id}>
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
                            <p
                              style={{
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                              onClick={() => toggleDrawer(task.id)}
                              // onClick={()=>showDrawer(task.id)}
                            >
                              ...
                            </p>
                            <Avatar
                              style={{
                                width: 30,
                                height: 30,
                                background: "#ff9318",
                              }}
                            >
                              {" "}
                              {task.data.AssignTo[0]}
                            </Avatar>
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
                              <select
                                style={{
                                  border: "1px solid #ff9318",
                                  cursor: "pointer",
                                }}
                                onChange={(e) =>
                                  updateData(task.id, e.target.value)
                                }
                              >
                                <option value="In-Progress">
                                  {task.data.Status}
                                </option>

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
                {/* fetching data of DONE Status */}
                <Card title="DONE" bordered={false}>
                  <div style={{ height: "67vh", overflow: "auto" }}>
                    {filterDataDone
                      .sort((a, b) => {
                        return new Date(b.data.Time) - new Date(a.data.Time);
                      })
                      .map((task) => (
                        <div className="todo-div2" key={task.id}>
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
                            <p
                              style={{
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                              onClick={() => toggleDrawer(task.id)}
                              // onClick={()=>showDrawer(task.id)}
                            >
                              ...
                            </p>
                            <Avatar
                              style={{
                                width: 30,
                                height: 30,
                                background: "#18ff65",
                              }}
                            >
                              {" "}
                              {task.data.AssignTo[0]}
                            </Avatar>
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
                              <select
                                style={{
                                  border: "1px solid #18ff65",
                                  cursor: "pointer",
                                }}
                                onChange={(e) =>
                                  updateData(task.id, e.target.value)
                                }
                              >
                                <option value="Done">{task.data.Status}</option>
                                <option value="To-Do"> Re-open</option>
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
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            style={{ width: "460px" }}
          >
            <div className="drawer">
              <h4> Activitie Details</h4>
              <hr />
              <div className="drawer-title">
                <h2> {his.TaskTitle}</h2>
                <h4 style={{ color: "#1890ff" }}>{his.AssignTo}</h4>
              </div>

              <h4 style={{ fontWeight: 600, color: " #FFD700" }}>
                {" "}
                Created On:
                <p style={{ fontWeight: 200, color: " black" }}>
                  {his.Time}
                </p>{" "}
              </h4>
              {/*{displayHistory
              .sort((a,b)=>{
                return 

              })
              .map((act)=>( ))}*/}

              <div>
                <h4 style={{ fontWeight: 600, color: "#1890ff" }}>
                  Last Updated On:{" "}
                  <p style={{ fontWeight: 200, color: "black" }}>
                    {his.UpdatedTime}
                  </p>
                </h4>

                <h4 style={{ fontWeight: 600, color: "#ff9318" }}>
                  Status:{" "}
                  <p style={{ fontWeight: 200, color: "black" }}>
                    {his.Status}
                  </p>
                </h4>
                {/* <h4 style={{ fontWeight: 600,color:"#18ff65" }}>
                  Done: <p style={{ fontWeight: 200,color:"black" }}>{his.Time}</p>
                </h4> */}
              </div>
            </div>
          </Drawer>

          {/* <Dialog open={open} onClose={onClose}>
            <DialogContent>Test</DialogContent>

          </Dialog> */}
          {/* </card> */}
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);

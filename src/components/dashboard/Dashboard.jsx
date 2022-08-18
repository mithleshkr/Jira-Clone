import React,{useState} from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { Add } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import "./Style.css";
import "antd/dist/antd.css";
import {  Form, Modal, Select,Input } from "antd";
import { db } from "../../firebase";
import swal from 'sweetalert';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {


  const [taskTitle,setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignTo, setAssignTo] = useState("");

  const title= <h4>Create New Task</h4>
  
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
            db.collection("task-details").add(
              {
                TaskTitle: taskTitle,
                TaskDescreption: taskDesc,
                EndDate: endDate,
                AssignTo: assignTo
              }
            )
            swal({
              title: "Great",
              text: "Task Added Successfully",
              icon: "success",
              timer: "2000",
              button: false    
            });
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
          
        //   db.collection("task-details").add(
        //     {
        //       TaskTitle: taskTitle,
        //       TaskDescreption: taskDesc,
        //       EndDate: endDate,
        //       AssignTo: assignTo
        //     }
        //   ).then((result)=>{
        //     console.log(result)
        //     swal("GREAT","Task added successfully", "success")
        //   },(error)=>{
        //     console.log(error)
        //     swal("Oops!", error.message, "error");
           
           
        //  })
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
          <Input placeholder="Enter Task Title"
          value={taskTitle}
          onChange={(e)=>setTaskTitle(e.target.value)}
        
          />
          
          {/* <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Title"/> */}
        </Form.Item>
        <Form.Item name="task description" label="Task Description">
        <Input placeholder="Enter Task Description"
        value={taskDesc}
        onChange={(e)=>setTaskDesc(e.target.value)}
        
        />
        {/* <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Description" type="textarea"/> */}
        </Form.Item>
        <Form.Item name="end-date" label="End Date" 
         rules={[
          {
            required: true,
            message: "Please select end date",
          },
        ]}
        >
          <Input type="date"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
          />
        {/* <TextField type="date" variant="outlined" size="small" fullWidth/> */}
      </Form.Item>
      <Form.Item
            name="assign-to"
            label="Assign to"
            rules={[
              {
                required: true,
                message: 'Select assignie',
              },
            ]}
          > 
          <Select defaultValue="select assign to" value={assignTo} onChange={(value)=>setAssignTo(value)}>
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
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Navbar />
        <div className="dashboard-card">
          <card className="dashboard-card">
            <Button
            style={{backgroundColor:"#1890ff",color:"white"}}
              variant="contained"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Add />
              Add Task
            </Button>
            <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
          </card>
        </div>
      </div>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task Details</DialogTitle>
        <DialogContent>
          <form></form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Dashboard;

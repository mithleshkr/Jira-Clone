import React,{useState} from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { Add } from "@material-ui/icons";
import { Button,TextField } from "@material-ui/core";
import "./Style.css";
import "antd/dist/antd.css";
import {  Form, Modal, Select } from "antd";
const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new task"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
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
          {/* <Input /> */}
          <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Title"/>
        </Form.Item>
        <Form.Item name="task description" label="Task Description">
        <TextField variant="outlined" fullWidth size="small"  placeholder="Enter Task Description" type="textarea"/>
        </Form.Item>
        <Form.Item name="end-date" label="End Date" 
         rules={[
          {
            required: true,
            message: "Please select end date",
          },
        ]}
        >
        <TextField type="date" variant="outlined" size="small" fullWidth/>
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
              
              <Select defaultValue="select assignie">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>          
          </Form.Item>
        {/* <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
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
